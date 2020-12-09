import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditComponent } from './edit/edit.component';
import { ServiceRoutingModule } from './services-routing.module'
import { ServicesComponent } from './services/services.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ServicesComponent, EditComponent],
  imports: [
    CommonModule,
    ServiceRoutingModule,
    FormsModule
  ]
})
export class ServicesModule { }
