import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FirebaseService } from 'src/app/shared/firebase.service';
import { IServiceData } from 'src/app/shared/interfaces/service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['../../../form-style.css', './edit.component.css'],
})
export class EditComponent implements OnInit {
  serviceDetails: IServiceData;
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
    private activatedRoute: ActivatedRoute,
    private firebaseService: FirebaseService
  ) {
    const serviceId = activatedRoute.snapshot.params.id;
    this.getData(serviceId);
  }

  ngOnInit(): void {}

  getData(serviceId) {
    this.firebaseService
      .getServiceDetails(serviceId)
      .subscribe((result: any) => {
        this.serviceDetails = result;
        this.serviceDetails['id'] = serviceId;
      });
  }

  deleteImageHandler() {
    this.firebaseService.deleteImage(this.serviceDetails.imageUrl);
    return (this.serviceDetails.imageUrl = '');
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
              this.serviceDetails['imageUrl'] = url;
            }
          });
        })
      )
      .subscribe((url) => {
        if (url) {
        }
      });
  }

  editServiceHandler(formData) {
    formData['imageUrl'] = this.fb ? this.fb : this.serviceDetails.imageUrl;
    this.firebaseService
      .editService(this.serviceDetails.id, formData)
      .then(() => {
        this.errorMessage = '';
        this.successMessage = 'Service has been successfully edited!';
        this.router.navigate(['/services']);
      })
      .catch((err) => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = '';
      });
  }
}
