import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { AddDeviceComponent } from './add-device/add-device.component';
import { AddServiceComponent } from './add-service/add-service.component';
import { EditUsersComponent } from './edit-users/edit-users.component';
import { RepairRequestsComponent } from './repair-requests/repair-requests.component';

const routes: Routes = [
    {
        path: 'admin',
        canActivateChild: [AuthGuard],
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'add-service'
            },
            {
                path: 'add-device',
                component: AddDeviceComponent,
                data: {
                    isLogged: true,
                    isAdmin: true,
                    title: "Add Device"
                }
            },
            {
                path: 'add-service',
                component: AddServiceComponent,
                data: {
                    isLogged: true,
                    isAdmin: true,
                    title: "Add Service"
                }
            },
            {
                path: 'edit-users',
                component: EditUsersComponent,
                data: {
                    isLogged: true,
                    isAdmin: true,
                    title: "Edit User Previleges"
                }
            },
            {
                path: 'repair-requests',
                component: RepairRequestsComponent,
                data: {
                    isLogged: true,
                    isAdmin: true,
                    title: "Repair Requests"
                }
            },
        ]
    }
];

export const AdminRoutingModule = RouterModule.forChild(routes);