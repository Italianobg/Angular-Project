import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseService } from 'src/app/shared/firebase.service';
import { IDeviceData } from 'src/app/shared/interfaces/device';
import { IServices } from 'src/app/shared/interfaces/service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['../../../form-style.css', './edit.component.css'],
})
export class EditComponent implements OnInit {
  deviceDetails: IDeviceData;
  services: IServices;
  selectedFile: File;
  fb;
  downloadURL: Observable<string>;
  errorMessage: string;
  successMessage: string;
  imageUrl: string;

  constructor(
    private router: Router,
    private storage: AngularFireStorage,
    private activatedRoute: ActivatedRoute,
    private firebaseService: FirebaseService
  ) {
    const deviceId = activatedRoute.snapshot.params.id;
    this.getData(deviceId);
  }

  ngOnInit(): void {
    this.deviceDetails = this.deviceDetails ? this.deviceDetails : null;
  }

  getData(deviceId) {
    this.firebaseService.getDeviceDetails(deviceId).subscribe((result) => {
      this.deviceDetails = result ? result : {};
      this.deviceDetails['id'] = deviceId;
      if (this.deviceDetails.linkedServices) {
        this.deviceDetails.linkedServices.forEach((element) => {
          this.firebaseService
            .getServiceDetails(element.service)
            .subscribe((result) => {
              element['name'] = result['name'];
            });
        });
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

  editDeviceHandler(formData) {
    formData['imageUrl'] = this.fb ? this.fb : this.deviceDetails.imageUrl;
    this.firebaseService
      .editDevice(this.deviceDetails.id, formData)
      .then((res) => {
        this.errorMessage = '';
        this.successMessage = 'Device has been successfully edited!';
        this.router.navigate(['/devices']);
      })
      .catch((err) => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = '';
      });
  }

  deleteImageHandler() {
    this.firebaseService.deleteImage(this.deviceDetails.imageUrl);
    return (this.deviceDetails.imageUrl = '');
  }

  onFileSelected(event) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `ServiceImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`ServiceImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe((url) => {
            if (url) {
              this.fb = url;
              this.deviceDetails['imageUrl'] = url;
            }
          });
        })
      )
      .subscribe((url) => {
        if (url) {
        }
      });
  }

  deleteAssignedServiceHandler(deviceId, serviceId, price) {
    this.firebaseService.deleteAssignedService(deviceId, serviceId, price);
  }

  assignServiceHandler(serviceId, price) {
    const deviceId = this.deviceDetails.id;
    this.firebaseService.assignService(deviceId, serviceId, price);
  }
}
