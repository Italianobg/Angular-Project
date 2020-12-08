import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { FormsModule } from '@angular/forms';
import { UserService } from './user.service';



@NgModule({
  declarations: [LoginComponent, RegisterComponent, ProfileComponent],
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule,
    FormsModule
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }
