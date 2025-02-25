"use client";

import Datatable from "@/components/datatable";
import TableSkeleton from "@/components/skeleton/TableSkeleton";
import { Card, CardContent } from "@/components/ui/card";
import { columns } from "../column";
import { useGetAllProductByStoreQuery } from "@/services/product.service";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ROUTES } from "@/constant";
import { useEffect, useMemo, useState } from "react";

export default function ListProductSeller({ storeSlug }: { storeSlug: string }) {
    const [filters, setFilters] = useState({
        page: 1,
        size: 10,
        name: "",
        status: "",
        debouncedName: "",
    });

    useEffect(() => {
        const timeout = setTimeout(() => {
            setFilters((prev) => ({ ...prev, debouncedName: prev.name }));
        }, 500);

        return () => clearTimeout(timeout);
    }, [filters.name]);

    const { data: allProduct, isLoading: productLoading } = useGetAllProductByStoreQuery({
        storeId: storeSlug,
        params: {
            page: filters.page,
            size: filters.size,
            name: filters.debouncedName,
            status: filters.status === 'all' ? "" : filters.status,
        }
    });

    // Menghitung total halaman (gunakan `useMemo` biar gak dihitung ulang tiap render)
    const totalPage = useMemo(() => allProduct?.data?.paging?.total_page || 1, [allProduct]);

    // Function untuk update filter dengan aman
    const updateFilter = (key: keyof typeof filters, value: any) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    // Reset ke page 1 jika name atau status berubah
    useEffect(() => {
        updateFilter("page", 1);
    }, [filters.name, filters.status]);


    return (
        <>
            <div className="flex justify-between items-center">
                <div className="flex gap-4 items-center">
                    <div className="flex gap-2 items-center">
                        <p>Show</p>
                        <Select onValueChange={(value) => updateFilter("size", Number(value))}>
                            <SelectTrigger className="w-[60px]">
                                <SelectValue placeholder={filters.size.toString()} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="15">15</SelectItem>
                                <SelectItem value="20">20</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Select onValueChange={(value) => updateFilter("status", value)}>
                        <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="All Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="ACTIVE">Active</SelectItem>
                            <SelectItem value="INACTIVE">Inactive</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex gap-4 items-center">
                    <Input
                        placeholder="Search category"
                        value={filters.name}
                        onChange={(e) => updateFilter("name", e.target.value)}
                    />
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
                        <Datatable
                            data={allProduct?.data?.data}
                            columns={columns}
                            page={filters.page}
                            totalPage={totalPage}
                            setPage={(newPage) => updateFilter("page", newPage)}
                        />
                    )}
                </CardContent>
            </Card>
        </>
    )
}