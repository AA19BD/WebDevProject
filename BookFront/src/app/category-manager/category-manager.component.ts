import { Component, OnInit } from '@angular/core';
import { Category } from '../localdb';
import { DataService } from '../data.service';

@Component({
  selector: 'app-category-manager',
  templateUrl: './category-manager.component.html',
  styleUrls: ['./category-manager.component.css']
})
export class CategoryManagerComponent implements OnInit {
  categories: Category[];
  category: Category;
  newCategory = {name: 'New Category'};
  selected = true;

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.getCategories();
    this.selected = true;
  }

  // tslint:disable-next-line:typedef
  getCategories(){
    this.data.getCategoryList().subscribe(result => {
      this.categories = result;
      this.category = result[0];
    });
  }

  // tslint:disable-next-line:typedef
  createCategory(){
    this.data.createCategory(this.newCategory).subscribe(result => {
      this.getCategories();
    });
  }

  // tslint:disable-next-line:typedef
  updateCategory(){
    this.data.updateCategory(this.category).subscribe(res => {
      this.category = res;
      this.getCategories();
    });
  }

  // tslint:disable-next-line:typedef
  deleteCategory(){
    this.data.deleteCategory(this.category.id).subscribe(res => {
      this.getCategories();
    });
  }

  // tslint:disable-next-line:typedef
  selectCategory(category: Category){
    this.category = category;
    this.selected = true;
  }

  // tslint:disable-next-line:typedef
  createNew(){
    this.selected = false;
  }

}
