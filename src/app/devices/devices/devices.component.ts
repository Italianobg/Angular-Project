import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css'],
})
export class DevicesComponent implements OnInit {
  devices: Array<any>;

  constructor(public db: AngularFirestore) {}

  ngOnInit(): void {
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
  }

  getDevices() {
    return this.db.collection('devices').snapshotChanges();
  }
}
