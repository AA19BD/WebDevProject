import { Injectable } from '@angular/core';
import { Book, Category, Author, User, LoginResponse, UserProfile } from './localdb';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseUrl = 'http://127.0.0.1:8000/api';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
  ) { }

  getCategoryList(): Observable<Category[]>{
    return this.http.get<Category[]>(`${this.baseUrl}/categories`);
  }

  getCategory(id): Observable<Category>{
    return this.http.get<Category>(`${this.baseUrl}/categories/${id}`);
  }

  createCategory(category): Observable<Category>{
    return this.http.post<Category>(`${this.baseUrl}/categories`, {name: category.name});
  }

  updateCategory(category: Category): Observable<Category>{
    return this.http.put<Category>(`${this.baseUrl}/categories/${category.id}`, category);
  }

  deleteCategory(id: number): Observable<Category>{
    return this.http.delete<Category>(`${this.baseUrl}/categories/${id}`);
  }

  getAuthors(): Observable<Author[]>{
    return this.http.get<Author[]>(`${this.baseUrl}/authors`);
  }

  createAuthor(author): Observable<Author>{
    return this.http.post<Author>(`${this.baseUrl}/authors`, author);
  }

  updateAuthor(author: Author): Observable<Author>{
    return this.http.put<Author>(`${this.baseUrl}/authors/${author.id}`, author);
  }

  deleteAuthor(id: number): Observable<Author>{
    return this.http.delete<Author>(`${this.baseUrl}/authors/${id}`);
  }

  getBookList(): Observable<Book[]>{
    return this.http.get<Book[]>(`${this.baseUrl}/books`);
  }

  getTopBoks(): Observable<Book[]>{
    return this.http.get<Book[]>(`${this.baseUrl}/books/top`);
  }

  getCategoryBooks(id): Observable<Book[]>{
    return this.http.get<Book[]>(`${this.baseUrl}/categories/${id}/books`);
  }

  getAuthorBooks(id): Observable<Book[]>{
    return this.http.get<Book[]>(`${this.baseUrl}/authors/${id}/books`);
  }

  getAuthor(id): Observable<Author>{
    return this.http.get<Author>(`${this.baseUrl}/authors/${id}`);
  }

  getBook(id): Observable<Book>{
    return this.http.get<Book>(`${this.baseUrl}/books/${id}`);
  }

  createBook(book): Observable<Book>{
    return this.http.post<Book>(`${this.baseUrl}/books`, book);
  }

  deleteBook(id: number): Observable<Book>{
    return this.http.delete<Book>(`${this.baseUrl}/books/${id}`);
  }

  updateBook(book: Book): Observable<Book>{
    const id = book.id;
    return this.http.put<Book>(`${this.baseUrl}/books/${id}`, book, this.httpOptions);
  }

  getUser(): Observable<UserProfile>{
    return this.http.get<UserProfile>(`${this.baseUrl}/user`);
  }

  addToProfile(id): Observable<UserProfile>{
    return this.http.put<UserProfile>(`${this.baseUrl}/mybook/${id}`, {}, this.httpOptions);
  }

  deleteFromProfile(id): Observable<UserProfile>{
    return this.http.delete<UserProfile>(`${this.baseUrl}/mybook/${id}`);
  }

  // tslint:disable-next-line:typedef
  updateUserProfile(userProfile){
    alert('updated ' + userProfile.name);
    return this.http.put<UserProfile>(`${this.baseUrl}/user`, userProfile, this.httpOptions);
  }

  login(username, password): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, {
      username,
      password
    });
  }

}
