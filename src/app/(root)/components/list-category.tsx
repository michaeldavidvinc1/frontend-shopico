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
                            <Link href="/" className='flex flex-col items-center'>
                                <Image src={item.image.url} width={75} height={75} alt='category' />
                                <p className='text-sm text-muted-foreground'>{item.name}</p>
                            </Link>
                        </SwiperSlide>
                    ))}
            </Swiper>
        </div>
    )
}

export default ListCategory
