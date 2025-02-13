"use client";

import Datatable from "@/components/datatable";
import TableSkeleton from "@/components/skeleton/TableSkeleton";
import { Card, CardContent } from "@/components/ui/card";
import { columns } from "../column";
import { useGetAllProductByStoreQuery } from "@/services/product.service";

export default function ListProductSeller({storeSlug} : {storeSlug: string}) {
    const { data: allProduct, isLoading: productLoading } = useGetAllProductByStoreQuery(storeSlug);

    return (
        <Card>
            <CardContent className="pt-6">
                {productLoading ? (
                    <TableSkeleton rows={5} />
                ) : (
                    <Datatable columns={columns} data={allProduct?.data?.data} />
                )}
            </CardContent>
        </Card>
    )
}