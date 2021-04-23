import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// tslint:disable-next-line:import-spacing
import { FormsModule }   from '@angular/forms';
import { CategoryListComponent } from './category-list/category-list.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailComponent } from './book-detail/book-detail.component';

import { RouterModule } from '@angular/router';
import { CategoryBooksComponent } from './category-books/category-books.component';
import { AuthorListComponent } from './author-list/author-list.component';
// tslint:disable-next-line:import-spacing
import { HttpClientModule, HTTP_INTERCEPTORS }from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthorBooksComponent } from './author-books/author-books.component';
import { TopBooksComponent } from './top-books/top-books.component';
import { CategoryManagerComponent } from './category-manager/category-manager.component';
import { AuthorManagerComponent } from './author-manager/author-manager.component';
import { BookManagerComponent } from './book-manager/book-manager.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryListComponent,
    BookListComponent,
    BookDetailComponent,
    CategoryBooksComponent,
    AuthorListComponent,
    UserProfileComponent,
    AuthorBooksComponent,
    TopBooksComponent,
    CategoryManagerComponent,
    AuthorManagerComponent,
    BookManagerComponent,
  ],
  imports: [
    BrowserModule, FormsModule,
    RouterModule.forRoot([
      {path: '', redirectTo: '/categories', pathMatch: 'full'},
      {path: 'categories', component: CategoryListComponent},
      {path: 'books', component: BookListComponent},
      {path: 'categories/:id/books', component: CategoryBooksComponent},
      {path: 'books/:id', component: BookDetailComponent},
      {path: 'authors', component: AuthorListComponent},
      {path: 'profile', component: UserProfileComponent},
      {path: 'authors/:id/books', component: AuthorBooksComponent},
      {path: 'top-books', component: TopBooksComponent},
      {path: 'category-manager', component: CategoryManagerComponent},
      {path: 'author-manager', component: AuthorManagerComponent},
      {path: 'book-manager', component: BookManagerComponent},
    ]),
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

