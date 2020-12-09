import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(    
    private userService: UserService,
    private router: Router) { 
   }

  get isLogged(): boolean{
    return this.userService.isLogged;
  }

  get isAdmin(): boolean{
    return this.userService.isAdmin;
  }

  logoutHandler(): void {
    this.userService.doLogout();
    this.router.navigate(['']);
  }

  ngOnInit(): void {
  }

  

}
