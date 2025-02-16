"use client";

import ProductCard from "@/components/product-card";
import Banner from "./components/banner";
import HeaderPage from "./components/header";
import ListCategory from "./components/list-category";
import BestSeller from "./components/best-seller";
import {useSession} from "next-auth/react";
import { useGetDataHomeQuery } from "@/services/seller.service";
import AllProductHome from "./components/all-product";

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
  const {data, isLoading} = useGetDataHomeQuery({});
  console.log(data)
  return (
    <div className="">
      <HeaderPage session={session} status={status} />
      <Banner />
      <ListCategory data={data?.data?.category} isLoading={isLoading} />
      <BestSeller data={data?.data?.allProduct} isLoading={isLoading} />
      <AllProductHome data={data?.data?.allProduct} isLoading={isLoading} />
    </div>
  );
}
