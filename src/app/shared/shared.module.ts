import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceTileComponent } from './service-tile/service-tile.component';
import { RouterModule } from '@angular/router';
import { DeviceTileComponent } from './device-tile/device-tile.component';
import { FirebaseService } from './firebase.service';

@NgModule({
  declarations: [ServiceTileComponent, DeviceTileComponent],
  imports: [CommonModule, RouterModule],
  exports: [ServiceTileComponent, DeviceTileComponent],
  providers: [FirebaseService],
})
export class SharedModule {}
