import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module'
import { RouterModule } from '@angular/router';
import { AddServiceComponent } from './add-service/add-service.component';
import { AddDeviceComponent } from './add-device/add-device.component';
import { EditUsersComponent } from './edit-users/edit-users.component';
import { RepairRequestsComponent } from './repair-requests/repair-requests.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddServiceComponent,
    AddDeviceComponent,
    EditUsersComponent,
    RepairRequestsComponent, 
    AdminHeaderComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    AdminRoutingModule,
    FormsModule
  ],
})
export class AdminModule { }
