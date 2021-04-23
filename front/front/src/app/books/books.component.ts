import { Component, OnInit } from '@angular/core';
import {Book} from '../models';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: Book[] = [];
  subcategoryId: number;
  constructor(private route: ActivatedRoute,
              private apiService: ApiService) { }

  ngOnInit(): void {
    this.subcategoryId = +this.route.snapshot.paramMap.get('subcategoryId');
    this.getBooksBySubcategory();
  }

  getBooksBySubcategory(): void {
    this.apiService.getBooksBySubcategory(this.subcategoryId).subscribe((data) => this.books = data);
  }

}
