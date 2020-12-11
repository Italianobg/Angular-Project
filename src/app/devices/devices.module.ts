import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details/details.component';
import { DeviceRoutingModule } from './devices-routing.module';
import { DevicesComponent } from './devices/devices.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [DetailsComponent, DevicesComponent, EditComponent],
  imports: [CommonModule, SharedModule, FormsModule, DeviceRoutingModule],
})
export class DevicesModule {}
