"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import SearchInput from './search-input'
import { Barcode, Headset, Heart, ShoppingBag, User } from 'lucide-react'
import BecomeSeller from './become-seller'
import { useSession } from "next-auth/react";
import { ROUTES } from "@/constant";
import { useGetStoreByUserQuery } from "@/services/store.service";
import { Session } from "next-auth";
import { HeaderLandingSkeleton } from '@/components/skeleton/SkeletonHeaderLanding'

interface HeaderPageProps {
    session: Session | null;
    status: "loading" | "authenticated" | "unauthenticated";
}

export default function HeaderPage({ session, status }: HeaderPageProps) {
    const { data, isLoading: isStoreLoading } = useGetStoreByUserQuery(
        session?.user?.id,
        {
            skip: !session?.user?.id,
        }
    );
    if (status === "loading" || isStoreLoading) {
        return <HeaderLandingSkeleton />;
    }
    return (
        <div className='w-full'>
            <div className='mx-auto px-4 md:px-20 lg:px-24'>
                <div className='py-1 flex justify-between'>
                    <div className='flex text-muted-foreground gap-2 items-center'>
                        <Barcode className='w-4 h-4' />
                        <p className='uppercase text-xs'>welcome to shopico</p>
                    </div>
                    {session?.user?.role === 'SELLER' ? (
                        <Link href={ROUTES.DASHBOARD_STORE(data?.data[0]?.slug)} className='text-sm text-muted-foreground'>Dashboard Store</Link>
                    ) : (
                        <BecomeSeller />
                    )}
                </div>
                <div className='py-4 flex justify-between items-center'>
                    <Image src="/image/logo.svg" width={100} height={100} alt='Logo' />
                    <SearchInput />
                    <div className='flex gap-2 items-center'>
                        <Headset className='w-10 h-10' />
                        <div className='flex flex-col'>
                            <h1 className='font-bold'>+62 822 8723 7236</h1>
                            <p className='text-sm text-muted-foreground'>customer.service@shopico.com</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full bg-primary/85 py-4 px-4 md:px-20 lg:px-24 mx-auto text-white'>
                <div className='flex justify-between items-stretch'>
                    <div className='flex gap-4 -my-3'>
                        <Link href="#" className='bg-primary px-4 flex items-center'>
                            Menu
                        </Link>
                        <Link href="#" className='px-4 flex items-center'>
                            Pages
                        </Link>
                        <Link href="#" className='px-4 flex items-center'>
                            Shop
                        </Link>
                    </div>
                    <div className='flex gap-6'>
                        <Link href="#">
                            <User className='w-4 h-4' />
                        </Link>
                        <Link href="#">
                            <Heart className='w-4 h-4' />
                        </Link>
                        <Link href="#">
                            <ShoppingBag className='w-4 h-4' />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
