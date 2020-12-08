import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { DevicesComponent } from './devices/devices.component';
import { ServicesComponent } from './services/services.component';
import { RepairRequestComponent } from './repair-request/repair-request.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    DevicesComponent,
    ServicesComponent,
    RepairRequestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    UserModule,
    AdminModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule 
  ],
  providers: [],
  bootstrap: [
    AppComponent, 
    HeaderComponent, 
    FooterComponent]
})

export class AppModule { }
