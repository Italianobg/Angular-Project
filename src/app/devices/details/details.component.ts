import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/shared/firebase.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  deviceDetails;

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public userService: UserService,
    public firebaseService: FirebaseService
  ) {
    const deviceId = activatedRoute.snapshot.params.id;
    this.getData(deviceId);
  }

  get isAdmin(): boolean {
    return this.userService ? this.userService.isAdmin : false;
  }

  ngOnInit(): void {}

  getData(deviceId) {
    this.firebaseService.getDeviceDetails(deviceId).subscribe((result) => {
      this.deviceDetails = result;
      this.deviceDetails['id'] = deviceId;
      if (this.deviceDetails.linkedServices) {
        this.deviceDetails.linkedServices.forEach((element) => {
          this.firebaseService
            .getServiceDetails(element.service)
            .subscribe((result) => {
              element['name'] = result['name'];
              element['description'] = result['description'];
              element['imageUrl'] = result['imageUrl'];
              element['data'] = element;
            });
        });
      } else {
        this.deviceDetails.linkedServices = [];
      }
    });
  }

  deleteDeviceHandler(deviceId, imageUrl) {
    this.firebaseService.deleteDevice(deviceId).then(
      (res) => {
        this.firebaseService.deleteImage(imageUrl);
        this.router.navigate(['/devices']);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
