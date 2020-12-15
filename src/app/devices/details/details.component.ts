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
      if (this.deviceDetails.linkedServices) {
        this.deviceDetails.linkedServices.forEach((element) => {
          this.getServiceDetails(element.service).subscribe((result) => {
            element['name'] = result['name'];
            element['description'] = result['description'];
            element['imageUrl'] = result['imageUrl'];
            element['data'] = element;
          });
        });
      }
    });
  }

  getDeviceDetails(deviceKey) {
    return this.db.collection('devices').doc(deviceKey).valueChanges();
  }

  getServiceDetails(serviceId) {
    return this.db.collection('services').doc(serviceId).valueChanges();
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
