import {DynamicBreadcrumb} from "@/components/breadcrumb-dynamis";
import {ROUTES} from "@/constant";

const ProductSeller = async({params}: { params: { storeSlug: string } }) => {
    const { storeSlug } = await params;
    const breadcrumbItems = [
        { label: "Dashboard", href: ROUTES.DASHBOARD_STORE(storeSlug) },
        { label: "Product" },
    ];

    return (
        <div className="space-y-6">
            <div className="space-y-1">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold tracking-tight">Product List</h1>
                    <p className="text-gray-500">Easily manage and monitor product data</p>
                </div>
                <DynamicBreadcrumb items={breadcrumbItems}/>
            </div>
        </div>
    );
};


export default ProductSeller