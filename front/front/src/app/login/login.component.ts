import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logged = false;
  username = '';
  password = '';

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.logged = true;
    }
  }

  constructor(private apiService: ApiService) {
  }

  login(): void {
    this.apiService.login(this.username, this.password).subscribe((data) => {
      // console.log(data);
      localStorage.setItem('token', data.token);
      this.logged = true;
      this.username = '';
      this.password = '';
    });
  }

  logout(): void {
    this.logged = false;
    localStorage.removeItem('token');
  }
}
