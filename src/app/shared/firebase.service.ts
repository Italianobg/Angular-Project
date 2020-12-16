import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private router: Router;

  constructor(
    public db: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  // ------------ CREATE ------------------
  addDevice(device) {
    return this.db.collection('devices').add(device);
  }

  addService(service) {
    return this.db.collection('services').add(service);
  }

  addRequest(request) {
    return this.db.collection('requests').add(request);
  }

  // ------------ READ ------------------
  getServices() {
    return this.db
      .collection('services')
      .snapshotChanges()
      .pipe(
        map((services) => {
          return services.map((service) => {
            const data: any = service.payload.doc.data();
            const id: string = service.payload.doc.id;
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

  getRequests() {
    return this.db
      .collection('requests')
      .snapshotChanges()
      .pipe(
        map((requests) => {
          return requests.map((requests) => {
            const data: any = requests.payload.doc.data();
            const id: string = requests.payload.doc.id;
            return { id, data };
          });
        })
      );
  }

  getUsers() {
    return this.db
      .collection('users')
      .snapshotChanges()
      .pipe(
        map((user) => {
          return user.map((user) => {
            const data = user.payload.doc.data();
            const id = user.payload.doc.id;
            return { id, data };
          });
        })
      );
  }

  getDeviceDetails(deviceId: string): any {
    return this.db.collection('devices').doc(deviceId).valueChanges();
  }

  getServiceDetails(serviceId: string) {
    return this.db.collection('services').doc(serviceId).valueChanges();
  }

  // ------------ UPDATE ------------------
  editDevice(id: string, value: string) {
    return this.db.collection('devices').doc(id).set(value, { merge: true });
  }

  editRequest(status, id) {
    return this.db.collection('requests').doc(id).update(status);
  }

  editService(id, value) {
    return this.db.collection('services').doc(id).set(value);
  }

  addAdmin(id, email) {
    return new Promise<any>(() => {
      this.db.collection('users').doc(id).set({ email: email, isAdmin: true });
    });
  }

  removeAdmin(id, email) {
    return new Promise<any>(() => {
      this.db.collection('users').doc(id).set({ email: email, isAdmin: false });
    });
  }

  incrementDeviceCounter(deviceId, increment) {
    return this.db
      .collection('devices')
      .doc(deviceId)
      .update({ requestCounter: increment });
  }

  incrementServiceCounter(serviceId, increment) {
    return this.db
      .collection('services')
      .doc(serviceId)
      .update({ requestCounter: increment });
  }

  deleteAssignedService(deviceId, serviceId, price) {
    return this.db
      .collection('devices')
      .doc(deviceId)
      .update({
        linkedServices: firebase.firestore.FieldValue.arrayRemove({
          service: serviceId,
          price: price,
        }),
      });
  }

  assignService(deviceId, serviceId, price) {
    this.db
      .collection('devices')
      .doc(deviceId)
      .update({
        linkedServices: firebase.firestore.FieldValue.arrayUnion({
          service: serviceId,
          price: price,
        }),
      });
  }

  // ------------ DELETE ------------------
  deleteImage(imageUrl) {
    return this.storage.refFromURL(imageUrl).delete();
  }

  deleteDevice(deviceId) {
    return this.db.collection('devices').doc(deviceId).delete();
  }

  deleteService(serviceKey) {
    return this.db.collection('services').doc(serviceKey).delete();
  }
}
