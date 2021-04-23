import { Component, OnInit } from '@angular/core';
import {Category} from '../models';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getCategories();
  }
  getCategories(): void {
    this.apiService.getCategories().subscribe((data) =>
      this.categories = data);
  }
}
