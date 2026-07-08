export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category?: string;
}

export interface FavoriteItem {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  reviewsCount: number;
}
