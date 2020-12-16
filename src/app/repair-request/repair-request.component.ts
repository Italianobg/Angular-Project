import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user/user.service';
import { map } from 'rxjs/operators';
import firebase from 'firebase/app';
import { FirebaseService } from '../shared/firebase.service';

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

  constructor(
    public userService: UserService,
    public db: AngularFirestore,
    public firebaseService: FirebaseService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.userService.currentUser;
    this.getData();
  }

  getData() {
    this.firebaseService.getDevices().subscribe((result) => {
      if (result.length === 0) {
        this.devices = undefined;
      } else {
        this.devices = result;
      }
    });
    this.firebaseService.getServices().subscribe((result) => {
      if (result.length === 0) {
        this.services = undefined;
      } else {
        this.services = result;
      }
    });
  }

  selectedDeviceHandler(id) {
    this.firebaseService.getDeviceDetails(id).subscribe((result) => {
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
      } else {
        this.selectedDevice.linkedServices = [];
      }

      this.currentServices = this.selectedDevice.linkedServices;
    });
  }

  selectedServiceHandler(id) {
    this.firebaseService.getServiceDetails(id).subscribe((result) => {
      this.selectedService = result;
      this.selectedService['id'] = id;
    });
  }

  repairRequest(formData) {
    const increment = firebase.firestore.FieldValue.increment(1);
    this.firebaseService.incrementDeviceCounter(formData.sDevice, increment);
    this.firebaseService.incrementDeviceCounter(formData.sService, increment);

    formData.email = this.currentUser.email;
    formData.device = this.selectedDevice.name;
    formData.service = this.selectedService.name;
    formData.status = 'Open';
    this.firebaseService.addRequest(formData);
  }
}
