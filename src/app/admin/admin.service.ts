import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class AdminService {

    constructor(public db: AngularFirestore) { }

    addDevice(value) {
        return new Promise<any>((resolve) => {
            this.db.collection('devices').add(value);
            resolve();
        })
    }

    addService(value) {
        return new Promise<any>((resolve) => {
            this.db.collection('services').add(value);
            resolve();
        })
    }

    editService(id, value) {
        return new Promise<any>((resolve) => {
            this.db.collection("services").doc(id).set(value);
            resolve();
        })
    }

}
