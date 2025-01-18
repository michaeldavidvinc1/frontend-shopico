"use client";

import ProductCard from '@/components/product-card';
import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";


const product = [
    {
        'name': 'title 1',
        'category': 'category 1',
        'harga': 100,
        'image': '/image/image1.jpg',
        'rating': 1.56
    },
    {
        'name': 'title 2',
        'category': 'category 2',
        'harga': 200,
        'image': '/image/image1.jpg',
        'rating': 4.26
    },
    {
        'name': 'title 3',
        'category': 'category 3',
        'harga': 300,
        'image': '/image/image1.jpg',
        'rating': 4.90
    },
    {
        'name': 'title 3',
        'category': 'category 3',
        'harga': 300,
        'image': '/image/image1.jpg',
        'rating': 4.90
    },
    {
        'name': 'title 3',
        'category': 'category 3',
        'harga': 300,
        'image': '/image/image1.jpg',
        'rating': 4.90
    },
    {
        'name': 'title 3',
        'category': 'category 3',
        'harga': 300,
        'image': '/image/image1.jpg',
        'rating': 4.90
    },
    {
        'name': 'title 3',
        'category': 'category 3',
        'harga': 300,
        'image': '/image/image1.jpg',
        'rating': 4.90
    },
    {
        'name': 'title 3',
        'category': 'category 3',
        'harga': 300,
        'image': '/image/image1.jpg',
        'rating': 4.90
    },
    {
        'name': 'title 3',
        'category': 'category 3',
        'harga': 300,
        'image': '/image/image1.jpg',
        'rating': 4.90
    },
    {
        'name': 'title 3',
        'category': 'category 3',
        'harga': 300,
        'image': '/image/image1.jpg',
        'rating': 4.90
    },
    {
        'name': 'title 3',
        'category': 'category 3',
        'harga': 300,
        'image': '/image/image1.jpg',
        'rating': 4.90
    },
]

const BestSeller = () => {
    return (
        <div className="mx-auto px-4 md:px-20 lg:px-24 py-8">
            <p className="font-bold text-2xl">Best Seller</p>
            <div className="flex mt-6">
                <Swiper
                    slidesPerView={5}>
                    {product.map((item, index) => (
                        <SwiperSlide key={index}>
                            <ProductCard
                                key={index}
                                name={item.name}
                                category={item.category}
                                harga={item.harga}
                                image={item.image}
                                rating={item.rating}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>

            </div>
        </div>
    )
}

export default BestSeller
