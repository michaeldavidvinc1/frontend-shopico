'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { Category } from '@/interface/category';
import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";

// {
//     'name': 'Jeans',
//     'icon': '/image/category-default.png'
// },

interface ListCategoryProps {
    data: Category[],
    isLoading: boolean
}

const ListCategory: FC<ListCategoryProps> = ({data, isLoading}) => {
    return (
        <div className='px-4 md:px-20 lg:px-24 mx-auto py-8'>
            <Swiper spaceBetween={50}
                slidesPerView={10}>
                {isLoading
                    ? Array.from({ length: 10 }).map((_, index) => (
                        <SwiperSlide key={index} className="flex flex-col items-center">
                            <Skeleton className="w-[75px] h-[75px] rounded-full" />
                            <Skeleton className="w-16 h-4 mt-2" />
                        </SwiperSlide>
                    ))
                    : data.map((item: Category, index) => (
                        <SwiperSlide key={index}>
                            <Link href="/" className="flex flex-col items-center">
                                <div className="w-[75px] h-[75px] relative">
                                    <Image
                                        src={item.image?.url ?? '/image/category-default.png'}
                                        alt="category"
                                        fill
                                        sizes="(max-width: 768px) 50px, (max-width: 1200px) 75px, 75px"
                                        className="rounded-md object-cover"
                                    />
                                </div>
                                <p className="text-sm text-muted-foreground">{item.name}</p>
                            </Link>
                        </SwiperSlide>
                    ))}
            </Swiper>
        </div>
    )
}

export default ListCategory
