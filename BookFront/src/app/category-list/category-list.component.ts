import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Category } from '../localdb';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: Category[];

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  // tslint:disable-next-line:typedef
  getCategories(){
    this.data.getCategoryList().subscribe(result => this.categories = result);
  }

}
