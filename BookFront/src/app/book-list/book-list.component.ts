import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Book } from '../localdb';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[];

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.getBooks();
  }

  // tslint:disable-next-line:typedef
  getBooks(){
    this.data.getBookList().subscribe(result => this.books = result);
  }

}
