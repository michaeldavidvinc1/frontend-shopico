"use client";

import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
    const { data: dataProduct, isLoading: loadDataProduct } = useGetSingleProductQuery(productSlug, {
        skip: !productSlug,
    });
    const { refetch: refetchProducts } = useGetAllProductByStoreQuery({storeId: storeSlug});
    const { data: dataCategory, isLoading: getCategoryLoading } = useGetAllCategoryQuery({}, {
        refetchOnMountOrArgChange: true,
    });
    const [uploadedImages, setUploadedImages] = useState<string[]>([]);
    const [deleteImages, setDeleteImages] = useState<string[]>([]);
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
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
        if (dataProduct?.data?.category && dataCategory?.data) {
            const product = dataProduct.data;
            form.reset({
                storeId: storeSlug,
                categoryId: product.category?.slug, // Isi categoryId di sini
                name: product.name,
                slug: product.slug,
                description: product.description,
                stock: product.stock,
                price: product.price,
                weight: product.weight || 0,
                image: [],
            });
    
            const initialImages = product.image?.map(({ url }: { url: string }) => url) || [];
            setUploadedImages(initialImages);
            setUploadedFiles([]);
        }
    }, [dataProduct, dataCategory]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const slug = generateSlug(form.getValues("name"));
            form.setValue("slug", slug, { shouldValidate: true });
        }, 300);

        return () => clearTimeout(timeout);
    }, [form.watch("name")]);

    // Handle Image Upload
    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const files = Array.from(e.target.files);
        const imageUrls = files.map((file) => URL.createObjectURL(file));

        setUploadedImages((prevImages) => [...prevImages, ...imageUrls]);
        setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
        form.setValue("image", files, { shouldValidate: true });
    };

    const handleRemoveImage = (index: number) => {
        // Ambil dulu gambar yang akan dihapus sebelum mengubah state
        const removedImage = uploadedImages[index];
        // Masukkan ke deleteImages hanya jika berupa URL (string)
        if (typeof removedImage === "string" && !removedImage.startsWith("blob:")) {
            setDeleteImages((prevFiles) => [...prevFiles, removedImage]);
        }

        // Update state uploadedImages
        setUploadedImages((prevImages) => prevImages.filter((_, i) => i !== index));

        // Update state uploadedFiles
        const newFiles = uploadedFiles.filter((_, i) => i !== index);
        setUploadedFiles(newFiles);

        // Update form value
        form.setValue("image", newFiles, { shouldValidate: true });
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

            // console.log("uploadedFiles:", uploadedFiles);
            // console.log("deleteImages:", deleteImages);

            uploadedFiles.forEach((file) => {
                formData.append("image", file);
            });

            deleteImages.forEach((file) => {
                formData.append("delete_image", file);
            });
            // console.log("Submitting:", Object.fromEntries(formData.entries()));
            // console.log("uploadedImages:", uploadedImages);
            // console.log("Values:", values);

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
                                            grid='grid-cols-5'
                                            onRemove={handleRemoveImage}
                                            onUpload={handleImageUpload}
                                            title="Product Image"
                                            imagePreviews={uploadedImages}
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
                                <FormField
                                    control={form.control}
                                    name="categoryId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Category Name</FormLabel>
                                            <FormControl>
                                                <Select value={field.value}
                    onValueChange={field.onChange}>
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="Category" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {dataCategory?.data?.map((item: Category) => (
                                                            <SelectItem value={item.slug} key={item.id}>{item.name}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* <FormFieldInput
                                    control={form.control}
                                    name="categoryId"
                                    label="Category"
                                    type="select"
                                    required
                                    options={dataCategory?.data?.map((item: Category) => ({ label: item.name, value: item.slug }))}
                                /> */}
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
