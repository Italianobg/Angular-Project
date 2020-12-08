import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../../form-style.css', './login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public userService: UserService,
    private router: Router ) { }

  errorMessage: string = '';

  ngOnInit(): void {
  }

  loginHanlder(formData){
    this.userService.doLogin(formData)
    .then(res => {
      this.router.navigate(['/']);
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
    })
  }

} 
