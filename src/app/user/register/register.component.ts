import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../../../form-style.css', './register.component.css'],
})
export class RegisterComponent implements OnInit {
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  registerHanlder(formData) {
    this.userService.doRegister(formData).then(
      (res) => {
        this.errorMessage = '';
        this.successMessage = 'Your account has been created';
        formData.email = formData.email.toLowerCase();
        this.userService.createUser(formData);
        this.router.navigate(['/user/login']);
      },
      (err) => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = '';
      }
    );
  }
}
