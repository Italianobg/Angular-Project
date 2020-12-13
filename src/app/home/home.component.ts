import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  services;
  devices;

  constructor(public db: AngularFirestore) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.getServices().subscribe((result) => {
      if (result.length === 0) {
        this.services = undefined;
      } else {
        this.services = result
          .sort((a, b) => b.data['requestCounter'] - a.data['requestCounter'])
          .slice(0, 8);
      }
    });

    this.getDevices().subscribe((result) => {
      if (result.length === 0) {
        this.devices = undefined;
      } else {
        this.devices = result
          .sort((a, b) => b.data['requestCounter'] - a.data['requestCounter'])
          .slice(0, 3);
      }
    });
  }

  getServices() {
    return this.db
      .collection('services')
      .snapshotChanges()
      .pipe(
        map((services) => {
          return services.map((service) => {
            const data = service.payload.doc.data();
            const id = service.payload.doc.id;
            return { id, data };
          });
        })
      );
  }

  getDevices() {
    return this.db
      .collection('devices')
      .snapshotChanges()
      .pipe(
        map((devices) => {
          return devices.map((device) => {
            const data = device.payload.doc.data();
            const id = device.payload.doc.id;
            return { id, data };
          });
        })
      );
  }
}
