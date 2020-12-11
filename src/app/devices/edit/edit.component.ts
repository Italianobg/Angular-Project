import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { AdminService } from 'src/app/admin/admin.service';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['../../../form-style.css', './edit.component.css'],
})
export class EditComponent implements OnInit {
  deviceDetails;
  services;
  selectedFile: File = null;
  fb;
  downloadURL: Observable<string>;
  errorMessage: string = '';
  successMessage: string = '';
  imageUrl: string = '';

  constructor(
    private db: AngularFirestore,
    private router: Router,
    private storage: AngularFireStorage,
    public activatedRoute: ActivatedRoute,
    private adminService: AdminService
  ) {
    const deviceId = activatedRoute.snapshot.params.id;
    this.getData(deviceId);
  }

  ngOnInit(): void {
    this.deviceDetails = this.deviceDetails ? this.deviceDetails : {};
  }

  getData(deviceId) {
    this.getDeviceDetails(deviceId).subscribe((result) => {
      this.deviceDetails = result;
      this.deviceDetails['id'] = deviceId;
      if (this.deviceDetails.linkedServices) {
        this.deviceDetails.linkedServices.forEach((element) => {
          this.getServiceDetails(element.service).subscribe((result) => {
            element['name'] = result['name'];
          });
        });
      }
    });

    this.getServices().subscribe((result) => {
      if (result.length === 0) {
        this.services = undefined;
      } else {
        this.services = result;
      }
    });
  }

  getDeviceDetails(deviceId) {
    return this.db.collection('devices').doc(deviceId).valueChanges();
  }

  getServiceDetails(serviceId) {
    return this.db.collection('services').doc(serviceId).valueChanges();
  }

  editDeviceHandler(formData) {
    formData['imageUrl'] = this.fb ? this.fb : this.deviceDetails.imageUrl;
    this.adminService.editDevice(this.deviceDetails.id, formData).then(
      (res) => {
        this.errorMessage = '';
        this.successMessage = 'Device has been successfully edited!';
        this.router.navigate(['/devices']);
      },
      (err) => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = '';
      }
    );
  }

  deleteImage() {
    this.storage.refFromURL(this.deviceDetails.imageUrl).delete();
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

  deleteAssignedService(deviceId, service, price) {
    return this.db
      .collection('devices')
      .doc(deviceId)
      .update({
        linkedServices: firebase.firestore.FieldValue.arrayRemove({
          service: service,
          price: price,
        }),
      });
  }

  getServices() {
    return this.db
      .collection('services')
      .snapshotChanges()
      .pipe(
        map((services) => {
          return services.map((service) => {
            const data = service.payload.doc.data();
            const id = service.payload.doc.id;
            return { id, data };
          });
        })
      );
  }

  assignService(id, price) {
    this.db
      .collection('devices')
      .doc(this.deviceDetails.id)
      .update({
        linkedServices: firebase.firestore.FieldValue.arrayUnion({
          service: id,
          price: price,
        }),
      });
  }
}
