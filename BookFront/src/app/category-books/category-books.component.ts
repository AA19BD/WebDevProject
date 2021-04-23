import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../localdb';

@Component({
  selector: 'app-category-books',
  templateUrl: './category-books.component.html',
  styleUrls: ['./category-books.component.css']
})
export class CategoryBooksComponent implements OnInit {
  books: Book[];

  constructor(
    private data: DataService,
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.getBooks();
  }

  // tslint:disable-next-line:typedef
  getBooks(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.data.getCategoryBooks(id).subscribe(result => this.books = result);
  }

}
