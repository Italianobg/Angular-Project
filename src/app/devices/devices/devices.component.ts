import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseService } from 'src/app/shared/firebase.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css'],
})
export class DevicesComponent implements OnInit {
  devices;

  constructor(
    public db: AngularFirestore,
    public firebaseService: FirebaseService
  ) {}

  ngOnInit(): void {
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
  }
}
