"use client";

import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ImageUpload from "@/components/image-upload";
import SellerCreateProductSkeleton from "@/components/skeleton/SellerCreateProductSkeleton";
import FormFieldInput from "@/components/form-field-input";
import { EditProductSellerSchema } from "@/schema";
import {
    useGetAllProductByStoreQuery,
    useGetSingleProductQuery,
    useUpdateProductMutation
} from "@/services/product.service";
import { useGetAllCategoryQuery } from "@/services/category.service";
import { generateSlug } from "@/utils/slugify";
import { ROUTES } from "@/constant";
import { Category } from "@/interface/category";

interface EditProductFormProps {
    storeSlug: string;
    productSlug: string;
}

interface ImageData {
    file?: File;
    url?: string;
}

const EditProductForm: FC<EditProductFormProps> = ({ storeSlug, productSlug }) => {
    const router = useRouter();
    const [updateProduct, { isLoading }] = useUpdateProductMutation();
    const { data: dataProduct, isLoading: loadDataProduct } = useGetSingleProductQuery(productSlug);
    const { refetch: refetchProducts } = useGetAllProductByStoreQuery(storeSlug);
    const { data: dataCategory, isLoading: getCategoryLoading } = useGetAllCategoryQuery({}, {
        refetchOnMountOrArgChange: true,
    });
    const [uploadedImages, setUploadedImages] = useState<ImageData[]>([]);

    type FormData = z.infer<typeof EditProductSellerSchema>;

    const form = useForm<FormData>({
        resolver: zodResolver(EditProductSellerSchema),
        defaultValues: {
            storeId: storeSlug,
            categoryId: "",
            name: "",
            slug: "",
            description: "",
            stock: 0,
            price: 0,
            weight: 0,
            image: [],
        },
    });

    useEffect(() => {
        if (dataProduct?.data) {
            const product = dataProduct.data;
            form.setValue("categoryId", product.category.slug);
            form.setValue("name", product.name);
            form.setValue("slug", product.slug);
            form.setValue("description", product.description);
            form.setValue("stock", product.stock);
            form.setValue("price", product.price);
            form.setValue("weight", product.weight ?? 0);

            const initialImages = product.image?.map(({ url }: { url: string }) => ({ url })) || [];
            form.setValue("image", initialImages);
            setUploadedImages(initialImages);
        }
    }, [dataProduct, form]);

    useEffect(() => {
        const slug = generateSlug(form.watch("name"));
        form.setValue("slug", slug, { shouldValidate: true });
    }, [form.watch("name")]);

    const handleImageUpload = (files: File[]) => {
        const newImages = files.map((file) => ({ file }));
        const currentImages = uploadedImages.filter((img) => img.url);
        const allImages = [...currentImages, ...newImages];

        setUploadedImages(allImages);
        form.setValue("image", allImages);
    };

    const handleRemove = (index: number) => {
        setUploadedImages((prevImages) => prevImages.filter((_, i) => i !== index));
        form.setValue(
            "image",
            (form.getValues("image") ?? []).filter((_, i) => i !== index)
        );
    };
    
    async function onSubmit(values: FormData) {
        try {
            const formData = new FormData();
            formData.append("storeId", values.storeId);
            formData.append("categoryId", values.categoryId);
            formData.append("name", values.name);
            formData.append("slug", values.slug);
            formData.append("description", values.description || "");
            formData.append("stock", values.stock.toString());
            formData.append("price", values.price.toString());
            formData.append("weight", values.weight ? values.weight.toString() : "0");

            const currentImages: string[] = [];
            const newImages: File[] = [];

            values.image?.forEach((image) => {
                if (image.url) {
                    currentImages.push(image.url);
                } else if (image.file) {
                    newImages.push(image.file);
                }
            });

            formData.append("current_images", JSON.stringify(currentImages));
            newImages.forEach((file) => formData.append("image", file));

            const res = await updateProduct({ payload: formData, productId: productSlug }).unwrap();

            if (res.success) {
                toast.success("Product updated successfully!");
                await refetchProducts();
                router.push(ROUTES.PRODUCT_SELLER(storeSlug));
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else if (typeof error === "object" && error !== null && "data" in error) {
                const apiError = error as { data: { msg: string } };
                toast.error(apiError.data.msg);
            } else {
                toast.error("An unknown error occurred");
            }
        }
    }

    if (getCategoryLoading || loadDataProduct) {
        return <SellerCreateProductSkeleton />;
    }

    return (
        <Form {...form}>
            <form className="mt-4 space-y-6" onSubmit={form.handleSubmit(onSubmit)} encType="multipart/form-data">
                <div className="grid grid-cols-5 gap-4">
                    {/* Left Column */}
                    <div className="col-span-3 flex flex-col gap-4">
                        <FormField
                            control={form.control}
                            name="image"
                            render={() => (
                                <FormItem>
                                    <FormControl>
                                        <ImageUpload
                                            multiple
                                            onUpload={handleImageUpload}
                                            onRemove={handleRemove}
                                            grid="grid-cols-5"
                                            title="Product Image"
                                            existingImages={dataProduct?.data?.image || []}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Card>
                            <CardHeader>Product Information</CardHeader>
                            <CardContent className="grid grid-cols-2 gap-4">
                                <FormFieldInput control={form.control} name="name" label="Product Name" type="text" required />
                                <FormFieldInput control={form.control} name="slug" label="Product Slug" type="text" required disabled />
                                <FormFieldInput
                                    control={form.control}
                                    name="categoryId"
                                    label="Category"
                                    type="select"
                                    required
                                    options={dataCategory?.data?.map((item: Category) => ({ label: item.name, value: item.slug }))}
                                />
                                <FormFieldInput control={form.control} name="description" label="Description" type="textarea" />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column */}
                    <div className="col-span-2">
                        <Card>
                            <CardHeader>Product Details</CardHeader>
                            <CardContent className="flex flex-col gap-4">
                                <FormFieldInput control={form.control} name="stock" label="Stock" type="number" required />
                                <FormFieldInput control={form.control} name="price" label="Price" type="number" required />
                                <FormFieldInput control={form.control} name="weight" label="Weight" type="number" />
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex justify-end gap-4">
                    <Link href={ROUTES.PRODUCT_SELLER(storeSlug)}>
                        <Button variant="ghost" type="button">Cancel</Button>
                    </Link>
                    <Button type="submit" disabled={isLoading}>
                        Update
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default EditProductForm;
