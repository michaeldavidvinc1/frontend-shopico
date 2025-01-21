'use client';

import React, { useEffect } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CreateStoreSchema } from '@/schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useCreateStoreMutation } from '@/services/store.service';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constant';
import { generateSlug } from '@/utils/slugify';
import { toast } from 'sonner';


const BecomeSeller = () => {
    const { data: session } = useSession();
    const router = useRouter();
    type FormData = z.infer<typeof CreateStoreSchema>
    const form = useForm<FormData>({
        resolver: zodResolver(CreateStoreSchema),
        defaultValues: {
            userId: "",
            name: "",
            slug: "",
        },
    });
    const [createStore, { isLoading }] = useCreateStoreMutation();

    async function onSubmit(values: FormData) {
        if(!session){
            return router.push(ROUTES.LOGIN);
        }
        const slug = generateSlug(values.name);
        form.setValue("slug", slug);
        form.setValue("userId", session.user.id);
        const updatedValues = form.getValues();
        try {
            const res = await createStore(updatedValues).unwrap();
            if(res.success){
                toast.success(res.message);
                router.push(ROUTES.DASHBOARD_STORE(res.data.slug));
            }
        } catch (error: any) {
            toast.error(error.data.msg)
        }
    }
    return (
        <div>
            <Popover>
                <PopoverTrigger>
                    <span className='text-sm text-muted-foreground'>Become a seller</span>
                </PopoverTrigger>
                <PopoverContent>
                    <div>
                        <Form {...form}>
                            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                                <FormField control={form.control} name="name" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Store Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} disabled={isLoading} type="text" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <Button type='submit'>
                                    Create
                                </Button>
                            </form>
                        </Form>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default BecomeSeller
