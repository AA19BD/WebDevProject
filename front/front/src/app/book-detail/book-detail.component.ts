import { Component, OnInit } from '@angular/core';
import {Book} from '../models';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  book: Book;
  bookId: number;

  constructor(private route: ActivatedRoute,
              private apiService: ApiService) { }

  ngOnInit(): void {
    this.bookId = +this.route.snapshot.paramMap.get('bookId');
    this.getBook();
  }

  getBook(): void {
    this.apiService.getBook(this.bookId).subscribe(data => this.book = data);
  }

}
