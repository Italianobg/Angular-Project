import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseService } from '../shared/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  services;
  devices;

  constructor(public firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.firebaseService.getServices().subscribe((result) => {
      if (result.length === 0) {
        this.services = undefined;
      } else {
        this.services = result
          .sort((a, b) => b.data['requestCounter'] - a.data['requestCounter'])
          .slice(0, 8);
      }
    });

    this.firebaseService.getDevices().subscribe((result) => {
      if (result.length === 0) {
        this.devices = undefined;
      } else {
        this.devices = result
          .sort((a, b) => b.data['requestCounter'] - a.data['requestCounter'])
          .slice(0, 3);
      }
    });
  }
}
