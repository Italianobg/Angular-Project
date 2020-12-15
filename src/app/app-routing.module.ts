import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RepairRequestsComponent } from './admin/repair-requests/repair-requests.component';
import { AuthGuard } from './core/guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RepairRequestComponent } from './repair-request/repair-request.component';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/home',
      },
      {
        path: 'home',
        component: HomeComponent,
        data: {
          title: 'HOME',
        },
      },
      {
        path: 'repair-request',
        component: RepairRequestComponent,
        data: {
          title: 'Repair Request',
          isLogged: true,
        },
      },
      {
        path: '**',
        component: NotFoundComponent,
        data: {
          title: '404',
        },
      },
    ],
  },
];

export const AppRoutingModule = RouterModule.forRoot(routes, {
  scrollPositionRestoration: 'top',
});
