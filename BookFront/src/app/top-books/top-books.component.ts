import { Component, OnInit } from '@angular/core';
import { Book } from '../localdb';
import { DataService } from '../data.service';

@Component({
  selector: 'app-top-books',
  templateUrl: './top-books.component.html',
  styleUrls: ['./top-books.component.css']
})
export class TopBooksComponent implements OnInit {
  books: Book[];

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.getBooks();
  }

  // tslint:disable-next-line:typedef
  getBooks(){
    this.data.getTopBoks().subscribe(result => this.books = result);
  }

}
