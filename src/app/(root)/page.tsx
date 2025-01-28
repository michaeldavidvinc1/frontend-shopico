"use client";

import ProductCard from "@/components/product-card";
import Banner from "./components/banner";
import HeaderPage from "./components/header";
import ListCategory from "./components/list-category";
import BestSeller from "./components/best-seller";
import {useSession} from "next-auth/react";

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
]

export default function Home() {
  const { data: session, status } = useSession();
  return (
    <div className="">
      <HeaderPage session={session} status={status} />
      <Banner />
      <ListCategory />
      <BestSeller />
      <div>
        <div className="mx-auto px-4 md:px-20 lg:px-24 py-8">
          <p className="font-bold text-2xl">Explore our Products</p>
          <div className="flex flex-wrap mt-6 gap-2">
            {product.map((item, index) => (
              <div key={index} className="bg-red-100">
                <ProductCard
                  name={item.name}
                  category={item.category}
                  harga={item.harga}
                  image={item.image}
                  rating={item.rating}
                />
              </div>
            ))}
          </div>
          <div className="w-full flex justify-center items-center mt-12">
            <button className="bg-gray-200 text-muted-foreground px-3 py-2 rounded-lg">
              View all products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
