"use client";

import { Heart, ShoppingCart } from 'lucide-react';
import React from 'react';
import StarRating from './rating-start';
import { formatRupiah } from '@/utils/format-rupiah';
import Link from 'next/link';
import { ROUTES } from '@/constant';

interface ProductCardProps {
    name: string;
    category: string;
    harga: number;
    image: string;
    rating: number;
    slug: string
}

const ProductCard: React.FC<ProductCardProps> = ({ name, category, harga, image, rating, slug }) => {

    return (
        <div className="w-64 p-4 bg-white rounded-lg shadow-sm border hover:scale-105 transition-transform duration-200 hover:shadow-lg">
            {/* Header with icons */}
            <div className="flex justify-end items-center mb-4">
                <div className="flex gap-2">
                    <button className="p-1 rounded-full">
                        <Heart className="w-5 h-5 text-gray-500 hover:text-red-500 transition-all" />
                    </button>
                </div>
            </div>

            <Link href={ROUTES.DETAIL_PRODUCT(slug)}>
                {/* Product Image */}
                <div className="flex justify-center mb-4">
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-48 object-cover rounded-md"
                    />
                </div>

                {/* Product Info */}
                <div className="flex flex-col gap-0 items-start">
                    <span className="text-xs text-muted-foreground">{category}</span>
                    <h3 className="text-lg text-black font-bold truncate">
                        {name}
                    </h3>
                    <div className='flex items-center gap-2'>
                        <StarRating rating={rating} />
                        <span className='text-xs font-bold'>
                            (12)
                        </span>
                    </div>
                </div>
                <div className='flex justify-between items-center mt-3'>
                    <p className="text-md font-bold">
                        {formatRupiah.format(harga)}
                    </p>
                </div>
            </Link>

        </div>
    );
};

export default ProductCard;

