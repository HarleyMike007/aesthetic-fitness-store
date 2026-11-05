export type ProductSize = 'S' | 'M' | 'L' | 'XL' | 'XXL';

export interface ProductColor {
  name: string;
  hex: string;
  previewClass?: string;
}

export interface Product {
  id: string;
  title: string;
  subtitle: string;
  category: 'hoodies' | 'tees' | 'shorts';
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  description: string;
  badge?: string;
  techBadge?: string;
  colors: ProductColor[];
  sizes: ProductSize[];
  printfulSyncVariantIds?: Record<string, number>;
}

export interface CartItem {
  cartId: string;
  productId: string;
  title: string;
  price: number;
  size: ProductSize;
  color: string;
  quantity: number;
}
