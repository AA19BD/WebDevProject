import { Component, OnInit } from '@angular/core';
import { Book, Author, Category } from '../localdb';
import { DataService } from '../data.service';

@Component({
  selector: 'app-book-manager',
  templateUrl: './book-manager.component.html',
  styleUrls: ['./book-manager.component.css']
})
export class BookManagerComponent implements OnInit {
  books: Book[];
  book: Book;
  authors: Author[];
  categories: Category[];
  newBook = {
    name: 'New Book',
    description: 'Default description',
    rating: 5,
    status: 'Default status',
    category_id: null,
    author_id: null,
  };
  selected = true;

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.getBooks();
    this.getCategories();
    this.getAuthors();
  }

  // tslint:disable-next-line:typedef
  getBooks(){
    this.data.getBookList().subscribe(res => {
      this.books = res;
      this.book = res[0];
      this.newBook.category_id = res[0].category.id;
      this.newBook.author_id = res[0].author.id;
    });
  }

  // tslint:disable-next-line:typedef
  getCategories(){
    this.data.getCategoryList().subscribe(result => {
      this.categories = result;
      const a = result.length;
    });
  }

  // tslint:disable-next-line:typedef
  getAuthors(){
    this.data.getAuthors().subscribe(result => {
      this.authors = result;
      const a = result.length;
    });
  }


  // tslint:disable-next-line:typedef
  createBook(){
    this.data.createBook(this.newBook).subscribe(res => {
      this.getBooks();
    });
  }

  // tslint:disable-next-line:typedef
  updateBook(){
    this.data.updateBook(this.book).subscribe(res => {
      this.getBooks();
    });
  }

  // tslint:disable-next-line:typedef
  deleteBook(){
    this.data.deleteBook(this.book.id).subscribe(res => {
      this.getBooks();
    });
  }

  // tslint:disable-next-line:typedef
  selectBook(book: Book){
    this.selected = true;
    this.book = book;
  }

  // tslint:disable-next-line:typedef
  createNew(){
    this.selected = false;
  }

}
