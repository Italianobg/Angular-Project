import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AddServiceComponent } from './add-service/add-service.component';
import { AddDeviceComponent } from './add-device/add-device.component';
import { EditUsersComponent } from './edit-users/edit-users.component';
import { RepairRequestsComponent } from './repair-requests/repair-requests.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule } from '@angular/forms';
import { AdminService } from './admin.service';
import { RepairRequestComponent } from '../repair-request/repair-request.component';

@NgModule({
  declarations: [
    AddServiceComponent,
    AddDeviceComponent,
    EditUsersComponent,
    RepairRequestsComponent,
    AdminHeaderComponent,
  ],
  imports: [CommonModule, SharedModule, AdminRoutingModule, FormsModule],
  providers: [AdminService],
})
export class AdminModule {}
