"use client";

import React, { FC, useEffect } from 'react'
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

interface CreateProductFormProps {
    storeSlug: string
}

const CreateProductForm: FC<CreateProductFormProps> = ({ storeSlug }) => {

    const router = useRouter();
    const [createProduct, { isLoading }] = useCreateProductMutation();
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

    return (
        <Form {...form}>
            <form className="mt-8 space-y-6" onSubmit={form.handleSubmit(onSubmit)} >
                <div className="space-y-4">
                    <FormField control={form.control} name="image" render={() => (
                        <FormItem>
                            <FormLabel>Product Image</FormLabel>
                            <FormControl>
                                
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
                    <button
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                    >
                        Save
                    </button>
                </div>

            </form>
        </Form>
    )
}

export default CreateProductForm
