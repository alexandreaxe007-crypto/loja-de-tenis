export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'corrida' | 'street' | 'trilha' | 'treino';
  categoryLabel: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  image: string;
  images: string[];
  colorways: {
    name: string;
    hex: string;
    image?: string;
  }[];
  sizes: number[];
  weight: string;
  drop: string;
  cushioning: string;
  surface: string;
  isNew?: boolean;
  isBestseller?: boolean;
  description: string;
  techHighlights: string[];
}

export interface CartItem {
  id: string;
  product: Product;
  selectedSize: number;
  selectedColor: string;
  quantity: number;
}

export interface Review {
  id: string;
  author: string;
  role: string;
  city: string;
  rating: number;
  date: string;
  model: string;
  distanceLogged: string;
  comment: string;
}
