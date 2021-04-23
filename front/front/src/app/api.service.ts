import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthToken, Book, Category, Subcategory} from './models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  BASE_URL = 'http://127.0.0.1:8000';
  constructor(private http: HttpClient) { }

  login(username, password): Observable<AuthToken> {
    return this.http.post<AuthToken>(`${this.BASE_URL}/api/login/`, {
      username,
      password
    });
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.BASE_URL}/api/categories/`);
  }

  getSubcategoriesByCategory(categoryId: number): Observable<Subcategory[]> {
    return this.http.get<Subcategory[]>(`${this.BASE_URL}/api/categories/${categoryId}/subcategories`);
  }

  getBooksBySubcategory(subcategoryId: number): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.BASE_URL}/api/subcategories/${subcategoryId}/books`);
  }

  getBook(bookId: number): Observable<Book> {
    return this.http.get<Book>(`${this.BASE_URL}/api/books/${bookId}`);
  }
}
