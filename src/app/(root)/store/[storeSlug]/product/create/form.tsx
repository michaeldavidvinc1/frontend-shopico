"use client";

import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { CreateProductSellerSchema } from '@/schema';
import { useCreateProductMutation, useGetAllProductByStoreQuery } from '@/services/product.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { ROUTES } from '@/constant';
import ImageUpload from '@/components/image-upload';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { generateSlug } from '@/utils/slugify';
import { useGetAllCategoryQuery } from '@/services/category.service';
import FormFieldInput from '@/components/form-field-input';
import Link from 'next/link';
import SellerCreateProductSkeleton from '@/components/skeleton/SellerCreateProductSkeleton';

interface CreateProductFormProps {
    storeSlug: string
}

const CreateProductForm: FC<CreateProductFormProps> = ({ storeSlug }) => {

    const router = useRouter();
    const [createProduct, { isLoading: loadingCreateProduct }] = useCreateProductMutation();
    const { refetch: refetchProducts } = useGetAllProductByStoreQuery(storeSlug);
    const [uploadedImages, setUploadedImages] = useState<string[]>([]);
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    type FormData = z.infer<typeof CreateProductSellerSchema>
    const form = useForm<FormData>({
        resolver: zodResolver(CreateProductSellerSchema),
        defaultValues: {
            storeId: storeSlug,
            categoryId: "",
            name: "",
            slug: "",
            description: "",
            stock: 0,
            price: 0,
            weight: 0,
            image: []
        },
    });

    const { data: dataCategory, isLoading: getCategoryLoading } = useGetAllCategoryQuery({});

    // Handle name convert to slug
    const nameValue = form.watch("name");
    useEffect(() => {
        form.setValue("slug", generateSlug(nameValue));
    }, [nameValue]);

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

        setUploadedImages((prevImages) => prevImages.filter((_, i) => i !== index));
        const newFiles = uploadedFiles.filter((_, i) => i !== index);
        setUploadedFiles(newFiles);
    
        form.setValue("image", newFiles, { shouldValidate: true });
    };

    // Submit data 
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
            formData.append("weight", values.weight !== undefined ? values.weight.toString() : "");

            uploadedFiles.forEach((file) => {
                formData.append("image", file);
            });
            console.log(Object.fromEntries(formData.entries()))
            const res = await createProduct(formData).unwrap();
            if (res.success) {
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

    if (getCategoryLoading) {
        return <SellerCreateProductSkeleton />
    }

    return (
        <Form {...form}>
            <form className="mt-4 space-y-6" onSubmit={form.handleSubmit(onSubmit)} encType='multipart/form-data' >
                <div className="grid grid-cols-5 gap-4">
                    <div className="col-span-3 flex flex-col gap-4">
                        <FormField control={form.control} name="image" render={() => (
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
                        )} />
                        <Card >
                            <CardHeader>
                                Product Information
                            </CardHeader>
                            <CardContent>
                                <div className='grid grid-cols-2 gap-4'>
                                    <FormFieldInput control={form.control} name="name" label="Product Name" type="text" required />
                                    <FormFieldInput control={form.control} name="slug" label="Product Slug" type="text" required disabled />
                                    <FormFieldInput
                                        control={form.control}
                                        name="categoryId"
                                        label="Category"
                                        type="select"
                                        required
                                        options={dataCategory?.data?.map((item: any) => ({ label: item.name, value: item.slug }))}
                                    />
                                    <FormFieldInput control={form.control} name="description" label="Description" type="textarea" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className='col-span-2'>
                        <Card>
                            <CardHeader>
                                Product Details
                            </CardHeader>
                            <CardContent>
                                <div className='flex flex-col gap-4'>
                                    <FormFieldInput control={form.control} name="stock" label="Stock" type="number" required />
                                    <FormFieldInput control={form.control} name="price" label="Price" type="price" required />
                                    <FormFieldInput control={form.control} name="weight" label="Weight" type="number" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
                {/* Submit Button */}
                <div className='flex justify-end gap-4'>
                    <Button variant="ghost" type="button">
                        <Link href={ROUTES.PRODUCT_SELLER(storeSlug)}>
                            Cancel
                        </Link>
                    </Button>
                    <Button
                        type="submit"
                        disabled={loadingCreateProduct}
                    >
                        Submit
                    </Button>
                </div>

            </form>
        </Form>
    )
}

export default CreateProductForm
