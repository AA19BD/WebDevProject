export interface Category {
  id: number;
  name: string;
}

export interface AuthToken {
  token: string;
}

export interface Subcategory {
  id: number;
  category: number;
  name: string;
  description: string;
}

export interface Book {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  rating: number;
  author: string;
  subcategory: number;
}
