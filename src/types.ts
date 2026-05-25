export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  category: string;
  shape: string;
  color: string;
  material: string;
  gender: string;
  featured: boolean;
  lensOptions: string[];
  rating: number;
  reviews: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  lensType: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: string;
  customer: {
    name: string;
    phone: string;
    email?: string;
    governorate: string;
    city: string;
    address: string;
  };
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}
