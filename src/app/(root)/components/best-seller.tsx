"use client";

import ProductCard from '@/components/product-card';
import ProductCardSkeleton from '@/components/skeleton/ProductCardSkeleton';
import { Skeleton } from '@/components/ui/skeleton';
import { Product } from '@/interface/product';
import React, { FC } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";

interface BestSellerProps {
    data: Product[],
    isLoading: boolean
}

const BestSeller: FC<BestSellerProps> = ({data, isLoading}) => {
    return (
        <div className="mx-auto px-4 md:px-20 lg:px-24 py-8">
            <p className="font-bold text-2xl">Best Seller</p>
            <div className="flex mt-6">
                <Swiper
                    slidesPerView={5}>
                    {isLoading
                        ? Array.from({ length: 5 }).map((_, index) => (
                            <SwiperSlide key={index}>
                                <ProductCardSkeleton />
                            </SwiperSlide>
                        ))
                        : data.map((item: Product, index) => (
                            <SwiperSlide key={index}>
                                <ProductCard
                                    key={index}
                                    name={item.name}
                                    category={item.category.name}
                                    harga={item.price}
                                    slug={item.slug}
                                    image={item.image[0].url}
                                    rating={3}
                                />
                            </SwiperSlide>
                        ))}
                </Swiper>
            </div>
        </div>
    )
}

export default BestSeller
