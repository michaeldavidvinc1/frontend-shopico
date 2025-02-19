"use client";

import Banner from "./components/banner";
import HeaderPage from "./components/header";
import ListCategory from "./components/list-category";
import BestSeller from "./components/best-seller";
import {useSession} from "next-auth/react";
import { useGetDataHomeQuery } from "@/services/seller.service";
import AllProductHome from "./components/all-product";

export default function Home() {
  const { data: session, status } = useSession();
  const {data, isLoading} = useGetDataHomeQuery({});
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
