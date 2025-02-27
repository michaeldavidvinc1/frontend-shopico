import ProductCard from "@/components/product-card";
import ProductCardSkeleton from "@/components/skeleton/ProductCardSkeleton";
import { Product } from "@/interface/product";

interface AllProductHomeProps {
    data: Product[],
    isLoading: boolean
}

export default function AllProductHome({data, isLoading} : AllProductHomeProps) {
    return (
        <div>
            <div className="mx-auto px-4 md:px-20 lg:px-24 py-8">
                <p className="font-bold text-2xl">Explore our Products</p>
                <div className="flex flex-wrap mt-6 gap-2">
                {isLoading ? (
                        Array.from({ length: 20 }).map((_, index) => (
                            <div key={index} className="bg-red-100">
                                <ProductCardSkeleton />
                            </div>
                        ))
                    ) : (
                        data.map((item: Product, index) => (
                            <div key={index} className="bg-red-100">
                                <ProductCard
                                    name={item.name}
                                    category={item.category.name}
                                    harga={item.price}
                                    slug={item.slug}
                                    image={item.image[0].url}
                                    rating={3}
                                />
                            </div>
                        ))
                    )}
                </div>
                <div className="w-full flex justify-center items-center mt-12">
                    <button className="bg-gray-200 text-muted-foreground px-3 py-2 rounded-lg">
                        View all products
                    </button>
                </div>
            </div>
        </div>
    )
}