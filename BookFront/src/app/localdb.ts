export interface Book{
    id: number;
    name: string;
    description: string;
    rating: number;
    status: string;
    category: Category;
    author: Author;
    category_id: number;
    author_id: number;
}

export interface Category{
    id: number;
    name: string;
}

export interface Author{
    id: number;
    name: string;
}

export interface UserProfile{
    id: number;
    user: User;
    name: string;
    books: Book[];
}

export interface User{
    id: number;
    username: string;
}

export interface LoginResponse{
    token: string;
}
