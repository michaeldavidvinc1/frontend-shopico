import { Category } from "./category";
import { Image } from "./image";

interface ProductImage {
  file?: File; // Untuk gambar baru yang diunggah
  url?: string; // Untuk URL gambar yang sudah ada
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  storeId: string;
  category: Category;
  description: string | null;
  stock: number;
  price: number;
  weight: number | null;
  status: string;
  image: Image[];
}

export interface CreateProductInterface {
  storeId: string;
  categoryId: string;
  name: string;
  slug: string;
  description?: string;
  stock: number;
  price: number;
  weight?: number;
  image?: ProductImage[];
}

export interface UpdateProductInterface {
  storeId?: string;
  categoryId?: string;
  name?: string;
  slug?: string;
  description?: string;
  stock?: number;
  price?: number;
  weight?: number;
  image?: ProductImage[];
}
