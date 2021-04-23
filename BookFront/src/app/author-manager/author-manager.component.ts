import { Component, OnInit } from '@angular/core';
import { Author } from '../localdb';
import { DataService } from '../data.service';

@Component({
  selector: 'app-author-manager',
  templateUrl: './author-manager.component.html',
  styleUrls: ['./author-manager.component.css']
})
export class AuthorManagerComponent implements OnInit {
  authors: Author[];
  author: Author;
  newAuthor = {name: 'New Author'};
  selected = true;

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.getAuthors();
  }

  // tslint:disable-next-line:typedef
  getAuthors(){
    this.data.getAuthors().subscribe(res => {
      this.authors = res;
      this.author = res[0];
    });
  }

  // tslint:disable-next-line:typedef
  createAuthor(){
    this.data.createAuthor(this.newAuthor).subscribe(res => {
      this.getAuthors();
    });
  }

  // tslint:disable-next-line:typedef
  updateAuthor(){
    this.data.updateAuthor(this.author).subscribe(res => {
      this.getAuthors();
    });
  }

  // tslint:disable-next-line:typedef
  deleteAuthor(){
    this.data.deleteAuthor(this.author.id).subscribe(res => {
      this.getAuthors();
    });
  }

  // tslint:disable-next-line:typedef
  selectAuthor(author: Author){
    this.author = author;
    this.selected = true;
  }

  // tslint:disable-next-line:typedef
  createNew(){
    this.selected = false;
  }

}
