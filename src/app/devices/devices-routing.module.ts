import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { DetailsComponent } from './details/details.component';
import { DevicesComponent } from './devices/devices.component';
import { EditComponent } from './edit/edit.component';


const routes: Routes = [
    {
        path: 'devices',
        canActivateChild: [AuthGuard],
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: DevicesComponent,
                data: {
                    title: 'Devices'
                  }
            },
            {
                path: 'details/:id',
                component: DetailsComponent,
                data: {
                  title: 'Device Details'
                }
            },
            {
                path: 'edit/:id',
                component: EditComponent,
                data: {
                  title: 'Edit Details'
                }
            }
        ]
    }
];

export const DeviceRoutingModule = RouterModule.forChild(routes);