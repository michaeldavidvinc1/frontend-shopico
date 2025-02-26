import StarRating from '@/components/rating-start'
import { Button } from '@/components/ui/button'
import { formatRupiah } from '@/utils/format-rupiah'
import { Heart, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import React, { FC } from 'react'
import TabsExample from './tabs'

interface CardDetailProductProps {
    slug: string
}

const CardDetailProduct: FC<CardDetailProductProps> = (slug) => {
    return (
        <div>
            <div className='bg-primary/85 container text-white py-4'>
                asdasdasd
            </div>
            <div className="container py-8">
                <div className="flex gap-8">
                    {/* Product Image */}
                    <div className="w-1/2 h-[500px] flex items-center justify-center">
                        <Image src="/test.jpeg" alt="Product Image" width={450} height={450} className="object-cover rounded-lg" />
                    </div>

                    {/* Product Details & Reviews */}
                    <div className="w-1/2 flex flex-col gap-6">
                        {/* Product Details */}
                        <div className="p-6 rounded-lg">
                            <h1 className='font-semibold text-xl'>Nama Product nya</h1>
                            <span className='mt-2 text-muted-foreground text-sm'>Category</span>
                            <div className='flex justify-between items-center mt-3 ml-[-3px]'>
                                <div className=''>
                                    <StarRating rating={3.4} />
                                    <span className='mt-1 ml-1 text-sm text-muted-foreground'>{284} Reviews</span>
                                </div>
                                <div className='flex gap-4 items-center'>
                                    <span className='text-muted-foreground text-sm'>Availability</span>
                                    <div className='text-white bg-primary px-3 py-1 rounded-full text-sm'>
                                        In stock
                                    </div>
                                </div>
                            </div>
                            <h1 className='text-primary mt-8 text-4xl/6 font-bold'>{formatRupiah.format(100000)}</h1>
                            <p className='mt-8 line-clamp-3 text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero vel facere quod, voluptate numquam magni quis cumque reiciendis voluptatem asperiores dolores consequatur ab sequi neque velit libero. Maxime saepe cum qui atque architecto, est sed ab debitis aperiam, optio, illum voluptatibus consequuntur. Unde delectus excepturi saepe eius tempora quis dignissimos, nesciunt sunt, ea at perspiciatis quisquam culpa architecto cupiditate vitae ut error temporibus amet quibusdam, nostrum dolorem assumenda! Odio quia facilis sapiente ut dolor praesentium laudantium. Omnis nesciunt dolor impedit numquam sapiente autem unde possimus iure quam voluptas ab eum corporis voluptatem aliquam facere cupiditate esse nihil, repellat ipsum ea?</p>
                            <div className='flex gap-8 items-center mt-8'>
                                <div>
                                    <Button className='flex items-center gap-2'>
                                        <ShoppingCart className='w-4 h-4' />
                                        Add to Cart
                                    </Button>
                                </div>
                                <div className='flex gap-1 items-center'>
                                    <Heart className='w-4 h-4 hover:text-red-500 cursor-pointer' />
                                    Whislist
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <TabsExample />
                <div>
                    <div className="bg-gray-100 p-6 rounded-lg text-black">
                        <h3 className="text-lg font-semibold mb-2">Customer Reviews</h3>
                        <p className="text-gray-700">⭐⭐⭐⭐⭐ (5/5)</p>
                        <p className="mt-2">"Produk ini sangat bagus! Kualitasnya luar biasa!"</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardDetailProduct
