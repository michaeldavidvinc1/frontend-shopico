import { DynamicBreadcrumb } from "@/components/breadcrumb-dynamis";
import { ROUTES } from "@/constant";

import ListProductSeller from "./components/list-product";
import ProductCount from "./components/product-count";

export default async function ProductSeller ({params}:{ params: Promise<{ storeSlug: string }> }) {
    const { storeSlug } = await params;
    const breadcrumbItems = [
        { label: "Dashboard", href: ROUTES.DASHBOARD_STORE(storeSlug) },
        { label: "Product" },
    ];
    return (
        <div className="space-y-6 flex flex-col gap-3">
            <div className="space-y-1">
                <div className="flex flex-col gap-4">
                    <h1 className="text-3xl font-bold tracking-tight">Products <span className="text-muted-foreground">({<ProductCount storeSlug={storeSlug} />})</span></h1>
                    <DynamicBreadcrumb items={breadcrumbItems} />
                </div>
            </div>
            
            <ListProductSeller storeSlug={storeSlug} />
        </div>
    );
};

