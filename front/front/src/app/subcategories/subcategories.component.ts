import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {Subcategory} from '../models';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-subcategories',
  templateUrl: './subcategories.component.html',
  styleUrls: ['./subcategories.component.css']
})
export class SubcategoriesComponent implements OnInit {
  subcategories: Subcategory[] = [];
  categoryId: number;
  constructor(private apiService: ApiService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.categoryId = +this.route.snapshot.paramMap.get('categoryId');
    this.getSubcategories();
  }

  getSubcategories(): void {
    this.apiService.getSubcategoriesByCategory(this.categoryId).subscribe((data) => this.subcategories = data);
  }
}
