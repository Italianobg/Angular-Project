import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { EditComponent } from './edit/edit.component';
import { ServicesComponent } from './services/services.component';


const routes: Routes = [
    {
        path: 'services',
        canActivateChild: [AuthGuard],
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: ServicesComponent,
                data: {
                    title: 'Services'
                  }
            },
            {
                path: 'edit/:id',
                component: EditComponent,
                data: {
                  title: 'Edit Services'
                }
            }
        ]
    }
];

export const ServiceRoutingModule = RouterModule.forChild(routes);