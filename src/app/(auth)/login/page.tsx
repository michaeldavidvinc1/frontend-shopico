"use client"

import { useEffect, useState } from "react";
import { Eye, EyeOff, Mail, Lock, ShoppingBag, ShoppingCart } from 'lucide-react';
import Link from "next/link";
import { LoginSchema } from "@/schema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { useLoginMutation } from "@/services/auth.service";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { ROUTES } from "@/constant";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    type FormData = z.infer<typeof LoginSchema>
    const [showPassword, setShowPassword] = useState(false);
    const form = useForm<FormData>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const [login, { isLoading }] = useLoginMutation();


    async function onSubmit(values: FormData) {
        try {
            const res = await login(values).unwrap();
            if (res.success) {
                const user = res.data;
                const loginRes = await signIn('credentials', {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    token: user.token,
                    callbackUrl: searchParams.get('callbackUrl') || ROUTES.HOME,
                    redirect: false
                })
                router.push(loginRes?.url || ROUTES.HOME);
            }
        } catch (error: any) {
            toast.error(error.data.msg)
        }
    }
    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Left Section - Hero/Branding */}
            <div className="hidden lg:block lg:w-1/2 dark:bg-blue-500/30 bg-primary">
                <div className="h-full flex flex-col items-center justify-center text-white px-12 ">
                    <div className="max-w-md text-center">
                        <h2 className="text-3xl font-bold mb-6">Shop with Confidence</h2>
                        <p className="text-lg text-white mb-8">
                            Discover amazing products and enjoy a secure shopping experience
                        </p>
                        <div className="flex justify-center">
                            <img
                                src="/image/login.png"
                                alt="Shopping Illustration"
                                className="max-w-sm"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Section - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md space-y-4 px-4">
                    <div className="text-center">
                        <ShoppingCart className="mx-auto h-12 w-12 text-primary" />
                        <h2 className="mt-6 text-3xl font-bold ">
                            Let's Sign you in
                        </h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                            You have don't an account <Link href="/register" className="font-bold underline">register</Link>
                        </p>
                    </div>

                    <Form {...form}>
                        <form className="mt-8 space-y-6" onSubmit={form.handleSubmit(onSubmit)} >
                            <div className="space-y-4">
                                {/* Email Input */}
                                <FormField control={form.control} name="email" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input {...field} disabled={isLoading} placeholder="john@email.com" type="email" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                {/* Password Input */}
                                <FormField control={form.control} name="password" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    {...field}
                                                    disabled={isLoading}
                                                    placeholder="*********"
                                                    type={showPassword ? "text" : "password"}
                                                    className="pr-10" // Add padding for the button
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    disabled={isLoading}
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className="h-4 w-4 text-gray-500" />
                                                    ) : (
                                                        <Eye className="h-4 w-4 text-gray-500" />
                                                    )}
                                                    <span className="sr-only">
                                                        {showPassword ? "Hide password" : "Show password"}
                                                    </span>
                                                </Button>
                                            </div>
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
                                    Sign in
                                </button>
                            </div>

                        </form>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;