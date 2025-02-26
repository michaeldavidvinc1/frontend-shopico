"use client"

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import SearchInput from './search-input'
import { Barcode, Headset, Heart, ShoppingBag, User } from 'lucide-react'
import BecomeSeller from './become-seller'
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
        session?.user?.id as string,
        {
            skip: !session?.user?.id,
        }
    );
    if (status === "loading" || isStoreLoading) {
        return <HeaderLandingSkeleton />;
    }
    return (
        <div>
            <div className='container bg-primary/85 text-white'>
                <div className='py-1 flex justify-between'>
                    <div className='flex gap-2 items-center'>
                        <Barcode className='w-4 h-4' />
                        <p className='uppercase text-xs'>welcome to shopico</p>
                    </div>
                    {session?.user?.role === 'SELLER' ? (
                        <Link href={ROUTES.DASHBOARD_STORE(data?.data[0]?.slug)} className='text-sm'>Dashboard Store</Link>
                    ) : (
                        <BecomeSeller />
                    )}
                </div>
            </div>
            <div className='container'>
                <div className='py-4 flex justify-around items-center'>
                    <Image src="/image/logo.svg" width={100} height={100} alt='Logo' />
                    <SearchInput />
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
