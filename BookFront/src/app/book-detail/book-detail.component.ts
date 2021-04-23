import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { Book, Category, Author } from '../localdb';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  book: Book;
  categories: Category[];
  authors: Author[];
  isAdded = false;

  constructor(
    private data: DataService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getBook();
    this.getCategories();
    this.getAuthors();
    this.check();
  }

  // tslint:disable-next-line:typedef
  getBook(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.data.getBook(id).subscribe(result => this.book = result);
  }

  // tslint:disable-next-line:typedef
  getCategories(){
    this.data.getCategoryList().subscribe(result => this.categories = result);
  }

  // tslint:disable-next-line:typedef
  getAuthors(){
    this.data.getAuthors().subscribe(result => this.authors = result);
  }

  // // tslint:disable-next-line:typedef
  // save(){
  //   this.data.updateBook(this.book).subscribe(() => alert('Updated'));
  // }

  // tslint:disable-next-line:typedef
  addMe(){
    this.data.addToProfile(this.book.id).subscribe();
    this.isAdded = true;
  }

  // tslint:disable-next-line:typedef
  removeMe(){
    this.data.deleteFromProfile(this.book.id).subscribe();
    this.isAdded = false;
  }

  // tslint:disable-next-line:typedef
  check(){
    this.data.getUser().subscribe(result => {
      const mybooks = result.books;
      for (const mybook of mybooks){
        if (this.book.id === mybook.id){
          this.isAdded = true;
          return;
        }
      }
      this.isAdded = false;
    });
  }
}
