import { Component, OnInit } from '@angular/core';
import { Author, Book } from '../localdb';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-author-books',
  templateUrl: './author-books.component.html',
  styleUrls: ['./author-books.component.css']
})
export class AuthorBooksComponent implements OnInit {
  author: Author;
  books: Book[];

  constructor(private data: DataService, private route: ActivatedRoute, ) {}

  ngOnInit(): void {
    this.getAuthor();
    this.getBooks();
  }

  // tslint:disable-next-line:typedef
  getAuthor(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.data.getAuthor(id).subscribe(result => {
      this.author = result;
    });
  }

  // tslint:disable-next-line:typedef
  getBooks(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.data.getAuthorBooks(id).subscribe(result => {
      this.books = result;
    });
  }
}
