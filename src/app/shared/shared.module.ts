import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceTileComponent } from './service-tile/service-tile.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ServiceTileComponent],
  imports: [CommonModule, RouterModule],
  exports: [ServiceTileComponent],
})
export class SharedModule {}
