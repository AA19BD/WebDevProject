import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { User } from './localdb';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private data: DataService) {}

  user: User;

   logged = false;
   // by deafault

  username = ''; // by deafault
  password = ''; // by deafault

  title = 'my-app4';


  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token){
      this.logged = true;
      this.getUser();
    }
  }

  // tslint:disable-next-line:typedef
  getUser(){
    this.data.getUser().subscribe(result => {
      this.user = result.user;
    });
  }

  // tslint:disable-next-line:typedef
  login(){
    this.data.login(this.username, this.password).subscribe(response => {
      localStorage.setItem('token', response.token);
      this.logged = true;
      this.username = '';
      this.password = '';
      this.getUser();
    });
  }

  // tslint:disable-next-line:typedef
  logout(){
    localStorage.clear();
    this.logged = false;
  }
}
