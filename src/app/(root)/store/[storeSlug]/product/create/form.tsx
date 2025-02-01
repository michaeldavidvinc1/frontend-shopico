"use client";

import React, { FC, useEffect, useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CreateProductSellerSchema } from '@/schema';
import { useCreateProductMutation } from '@/services/product.service';
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
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useGetAllCategoryQuery } from '@/services/category.service';
import FormFieldInput from '@/components/form-field-input';
import Link from 'next/link';


interface CreateProductFormProps {
    storeSlug: string
}

const CreateProductForm: FC<CreateProductFormProps> = ({ storeSlug }) => {

    const router = useRouter();
    const [createProduct, { isLoading }] = useCreateProductMutation();
    const [uploadedImages, setUploadedImages] = useState<File[]>([]);
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
    const nameValue = form.watch("name");
    useEffect(() => {
        form.setValue("slug", generateSlug(nameValue));
    }, [nameValue]);

    const handleImageUpload = (files: File[]) => {
        setUploadedImages(files);
        form.setValue("image", files);
    };

    async function onSubmit(values: FormData) {
        try {
            const res = await createProduct(values).unwrap();
            if (res.success) {
                const user = res.data;
                router.push(ROUTES.PRODUCT_SELLER(storeSlug));
            }
        } catch (error: any) {
            toast.error(error.data.msg)
        }
    }

    if (getCategoryLoading) {
        return <h1>Lagi loading...</h1>
    }

    return (
        <Form {...form}>
            <form className="mt-4 space-y-6" onSubmit={form.handleSubmit(onSubmit)} >
                <div className="grid grid-cols-5 gap-4">
                    <div className="col-span-3 flex flex-col gap-4">
                        <FormField control={form.control} name="image" render={() => (
                            <FormItem>
                                <FormControl>
                                    <ImageUpload
                                        multiple
                                        onUpload={handleImageUpload}
                                        grid='grid-cols-5'
                                        title="Product Image"
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
                                    <FormFieldInput control={form.control} name="weight" label="Weight" type="number" required />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
                {/* Submit Button */}
                <div className='flex justify-end gap-4'>
                    <Button variant="ghost">
                        <Link href={ROUTES.PRODUCT_SELLER(storeSlug)}>
                            Cancel
                        </Link>
                    </Button>
                    <Button
                        type="submit"
                    >
                        Submit
                    </Button>
                </div>

            </form>
        </Form>
    )
}

export default CreateProductForm
