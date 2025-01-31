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
            categoryId: "asd",
            name: "asd",
            slug: "asd",
            description: "asd",
            stock: 1,
            price: 1,
            weight: 1,
            image: []
        },
    });

    const handleImageUpload = (files: File[]) => {
        setUploadedImages(files);
        form.setValue("image", files);
    };


    async function onSubmit(values: FormData) {
        console.log(values)

        // try {
        //     const res = await createProduct(values).unwrap();
        //     if (res.success) {
        //         const user = res.data;
        //         router.push(ROUTES.PRODUCT_SELLER(storeSlug));
        //     }
        // } catch (error: any) {
        //     toast.error(error.data.msg)
        // }
    }

    return (
        <Form {...form}>
            <form className="mt-8 space-y-6" onSubmit={form.handleSubmit(onSubmit)} >
                <div className="space-y-4">
                    <FormField control={form.control} name="image" render={() => (
                        <FormItem>
                            <FormLabel>Product Image</FormLabel>
                            <FormControl>
                                <ImageUpload
                                    multiple
                                    onUpload={handleImageUpload}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Product Name</FormLabel>
                            <FormControl>
                                <Input {...field} disabled={isLoading} type="text" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                </div>

                {/* Submit Button */}
                <div>
                    <Button
                        type="submit"
                    >
                        Save
                    </Button>
                </div>

            </form>
        </Form>
    )
}

export default CreateProductForm
