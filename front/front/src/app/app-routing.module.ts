import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CategoriesComponent} from './categories/categories.component';
import {LoginComponent} from './login/login.component';
import {MainPageComponent} from './main-page/main-page.component';
import {SubcategoriesComponent} from './subcategories/subcategories.component';
import {BooksComponent} from './books/books.component';
import {BookDetailComponent} from './book-detail/book-detail.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'categories', component: CategoriesComponent},
  {path: 'categories/:categoryId', component: SubcategoriesComponent},
  {path: 'categories/:categoryId/subcategories/:subcategoryId/books', component: BooksComponent},
  {path: 'categories/:categoryId/subcategories/:subcategoryId/books/:bookId', component: BookDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
