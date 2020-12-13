import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user/user.service';
import { map } from 'rxjs/operators';
import firebase from 'firebase/app';

@Component({
  selector: 'app-repair-request',
  templateUrl: './repair-request.component.html',
  styleUrls: ['../../form-style.css', './repair-request.component.css'],
})
export class RepairRequestComponent implements OnInit {
  currentUser;
  devices;
  selectedDevice;
  services;
  currentServices;
  selectedService;

  constructor(public userService: UserService, public db: AngularFirestore) {}

  ngOnInit(): void {
    this.currentUser = this.userService.currentUser;
    this.getData();
  }

  getData() {
    this.getDevices().subscribe((result) => {
      if (result.length === 0) {
        this.devices = undefined;
      } else {
        this.devices = result;
      }
    });
    this.getServices().subscribe((result) => {
      if (result.length === 0) {
        this.services = undefined;
      } else {
        this.services = result;
      }
    });
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

  getDevice(id) {
    return this.db.collection('devices').doc(id).valueChanges();
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

  selectedDeviceHandler(id) {
    this.getDevice(id).subscribe((result) => {
      this.selectedDevice = result;
      this.selectedDevice['id'] = id;

      if (this.selectedDevice.linkedServices) {
        this.selectedDevice.linkedServices.forEach((s) => {
          this.services.forEach((service) => {
            if (service.id === s.service) {
              s.name = service.data.name;
            }
          });
        });
      }

      this.currentServices = this.selectedDevice.linkedServices
        ? this.selectedDevice.linkedServices
        : [];
    });
  }

  getServiceDetails(id) {
    return this.db.collection('services').doc(id).valueChanges();
  }

  selectedServiceHandler(id) {
    this.getServiceDetails(id).subscribe((result) => {
      this.selectedService = result;
      this.selectedService['id'] = id;
    });
  }

  repairRequest(formData) {
    const increment = firebase.firestore.FieldValue.increment(1);
    this.db
      .collection('devices')
      .doc(formData.sDevice)
      .update({ requestCounter: increment });
    this.db
      .collection('services')
      .doc(formData.sService)
      .update({ requestCounter: increment });

    formData.email = this.currentUser.email;
    formData.device = this.selectedDevice.name;
    formData.service = this.selectedService.name;
    formData.status = 'Open';
    this.db.collection('requests').add(formData);
  }
}
