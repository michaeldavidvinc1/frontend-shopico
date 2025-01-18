'use client';

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";

const category = [
    {
        'name': 'Cameras',
        'icon': '/image/category-default.png'
    },
    {
        'name': 'Video Games',
        'icon': '/image/category-default.png'
    },
    {
        'name': 'Tablet',
        'icon': '/image/category-default.png'
    },
    {
        'name': 'TV & Audio',
        'icon': '/image/category-default.png'
    },
    {
        'name': 'Headphone',
        'icon': '/image/category-default.png'
    },
    {
        'name': 'Clothes',
        'icon': '/image/category-default.png'
    },
    {
        'name': 'Jeans',
        'icon': '/image/category-default.png'
    },
    {
        'name': 'Jeans',
        'icon': '/image/category-default.png'
    },
    {
        'name': 'Jeans',
        'icon': '/image/category-default.png'
    },
    {
        'name': 'Jeans',
        'icon': '/image/category-default.png'
    },
    {
        'name': 'Jeans',
        'icon': '/image/category-default.png'
    },

]

const ListCategory = () => {
    return (
        <div className='px-4 md:px-20 lg:px-24 mx-auto py-8'>
            <Swiper spaceBetween={50}
                slidesPerView={10}>
                {category.map((item, index) => (
                    <SwiperSlide key={index}>
                        <Link href="/" className='flex flex-col items-center'>
                            <Image src={item.icon} width={75} height={75} alt='category' />
                            <p className='text-sm text-muted-foreground'>{item.name}</p>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default ListCategory
