import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Author } from '../localdb';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit {
  authors: Author[];

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.getAuthors();
  }

  // tslint:disable-next-line:typedef
  getAuthors(){
    this.data.getAuthors().subscribe(result => this.authors = result);
  }


}
