"use client"

import { DynamicBreadcrumb } from "@/components/breadcrumb-dynamis";
import Datatable from "@/components/datatable";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ROUTES } from "@/constant";
import { Plus } from "lucide-react";
import Link from "next/link";
import { columns } from "./column";
import { useGetAllProductByStoreQuery } from "@/services/product.service";
import { use, useMemo } from "react";
import TableSkeleton from "@/components/skeleton/TableSkeleton";
import { Product } from "@/interface/product";

const ProductSeller = ({ params }:{ params: Promise<{ storeSlug: string }> }) => {
    const { storeSlug } = use(params);
    const {data: allProduct, isLoading: productLoading} = useGetAllProductByStoreQuery(storeSlug);
    const product: Product[] = useMemo(() => allProduct?.data?.data || [], [allProduct]);
    const breadcrumbItems = [
        { label: "Dashboard", href: ROUTES.DASHBOARD_STORE(storeSlug) },
        { label: "Product" },
    ];
    return (
        <div className="space-y-6 flex flex-col gap-3">
            <div className="space-y-1">
                <div className="flex flex-col gap-4">
                    <h1 className="text-3xl font-bold tracking-tight">Products <span className="text-muted-foreground">({allProduct ? allProduct?.data?.data?.length: 0})</span></h1>
                    <DynamicBreadcrumb items={breadcrumbItems} />
                </div>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex gap-4 items-center">
                    <div className="flex gap-2 items-center">
                        <p>Show</p>
                        <Select>
                            <SelectTrigger className="w-[60px]">
                                <SelectValue placeholder="10" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="15">15</SelectItem>
                                <SelectItem value="20">20</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Select>
                        <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="All Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex gap-4 items-center">
                    <Input placeholder="Search product" />
                    <button className="bg-primary text-white px-2 py-2 rounded-full">
                        <Link href={ROUTES.CREATE_PRODUCT_SELLER(storeSlug)} >
                            <Plus className="w-4 h-4" />
                        </Link>
                    </button>
                </div>
            </div>
            <Card>
                <CardContent className="pt-6">
                    {productLoading ? (
                        <TableSkeleton rows={5} />
                    ) : (
                        <Datatable columns={columns} data={product} />
                    )}
                </CardContent>
            </Card>
        </div>
    );
};


export default ProductSeller