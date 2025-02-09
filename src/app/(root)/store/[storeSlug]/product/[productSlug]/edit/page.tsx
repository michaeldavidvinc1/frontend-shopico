import { DynamicBreadcrumb } from '@/components/breadcrumb-dynamis';

import { ROUTES } from '@/constant';

import React from 'react'
import EditProductForm from './form';

const CreateProductSeller = async ({ params }: { params: { storeSlug: string, productSlug: string } }) => {
    const { storeSlug, productSlug } = await params;
    const breadcrumbItems = [
        { label: "Dashboard", href: ROUTES.DASHBOARD_STORE(storeSlug) },
        { label: "Product", href: ROUTES.PRODUCT_SELLER(storeSlug) },
        { label: "Edit" }
    ];

    return (
        <div className="space-y-6 flex flex-col">
            <div className="space-y-1">
                <div className="flex flex-col gap-4">
                    <h1 className="text-3xl font-bold tracking-tight">Edit Product</h1>
                    <DynamicBreadcrumb items={breadcrumbItems} />
                </div>
            </div>
            <div>
                <EditProductForm storeSlug={storeSlug} productSlug={productSlug} />
            </div>
        </div>
    )
}

export default CreateProductSeller
