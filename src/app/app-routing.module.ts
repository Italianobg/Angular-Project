import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RepairRequestsComponent } from './admin/repair-requests/repair-requests.component';
import { AuthGuard } from './core/guards/auth.guard';
import { DevicesComponent } from './devices/devices.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RepairRequestComponent } from './repair-request/repair-request.component';
import { ServicesComponent } from './services/services.component';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthGuard],
    children:[
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/home'
      },
      {
        path: 'home',
        component: HomeComponent,
        data: {
          title: 'HOME'
        }
      },
      {
        path: 'devices',
        component: DevicesComponent,
        data: {
          title: 'Devices'
        }
      },
      {
        path: 'services',
        component: ServicesComponent,
        data: {
          title: 'Services'
        }
      },
      {
        path: 'repair-request',
        component: RepairRequestComponent,
        data: {
          title: 'Repair Request'
        }
      },
      {
        path: '**',
        component: NotFoundComponent,
        data: {
          title: '404'
        }
      }]
  },
];

export const AppRoutingModule = RouterModule.forRoot(routes);
