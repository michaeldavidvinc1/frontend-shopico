export type ApiProduct = {
    id: string;
    name: string;
    slug: string;
    storeId: string;
    category: {
        id: string;
        name: string;
    };
    description: string | null;
    stock: number;
    price: number;
    weight: number | null;
    status: string;
    image: {
        id: string;
        url: string;
        type: string;
    }[];
};
