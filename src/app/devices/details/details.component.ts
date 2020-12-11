import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  deviceDetails;

  constructor(
    public db: AngularFirestore,
    public storage: AngularFireStorage,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public userService: UserService
  ) {
    const deviceId = activatedRoute.snapshot.params.id;
    this.getData(deviceId);
  }

  get isAdmin(): boolean {
    return this.userService ? this.userService.isAdmin : false;
  }

  ngOnInit(): void {}

  getData(deviceId) {
    this.getDeviceDetails(deviceId).subscribe((result) => {
      this.deviceDetails = result;
      this.deviceDetails['id'] = deviceId;
    });
  }

  getDeviceDetails(deviceKey) {
    return this.db.collection('devices').doc(deviceKey).valueChanges();
  }

  deleteDeviceHandler(deviceId, imageUrl) {
    this.deleteDevice(deviceId).then(
      (res) => {
        this.storage.refFromURL(imageUrl).delete();
        this.router.navigate(['/devices']);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteDevice(deviceKey) {
    return this.db.collection('devices').doc(deviceKey).delete();
  }
}
