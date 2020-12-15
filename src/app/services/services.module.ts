import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditComponent } from './edit/edit.component';
import { ServiceRoutingModule } from './services-routing.module';
import { ServicesComponent } from './services/services.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ServicesComponent, EditComponent],
  imports: [CommonModule, SharedModule, FormsModule, ServiceRoutingModule],
})
export class ServicesModule {}
