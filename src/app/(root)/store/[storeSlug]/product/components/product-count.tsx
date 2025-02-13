"use client";

import { useEffect, useState } from "react";
import { useGetAllProductByStoreQuery } from "@/services/product.service";

export default function ProductCount({ storeSlug }: { storeSlug: string}) {
    const { data: allProduct } = useGetAllProductByStoreQuery(storeSlug);
    const [totalProducts, setTotalProducts] = useState(0);

    useEffect(() => {
        if (allProduct?.data?.data) {
            setTotalProducts(allProduct.data.data.length);
        }
    }, [allProduct]);

    return totalProducts;
}
