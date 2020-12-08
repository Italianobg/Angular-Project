import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
    {
        path: 'user',
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'register',
                component: RegisterComponent,
                data:{
                    isLogged: false,
                    isAdmin: false,
                    title: "Register User"
                },
            },
            {
                path: 'login',
                component: LoginComponent,
                data: {
                    isLogged: false,
                    isAdmin: false,
                    title: "User Login"
                },
            },
            {
                path: 'profile',
                component: ProfileComponent,
                data: {
                    isLogged: true,
                    title: 'User Profile'
                },
            }
        ]
    }
];

export const UserRoutingModule = RouterModule.forChild(routes);