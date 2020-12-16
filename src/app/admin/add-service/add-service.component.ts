import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { FirebaseService } from 'src/app/shared/firebase.service';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['../../../form-style.css', './add-service.component.css'],
})
export class AddServiceComponent implements OnInit {
  serviceDetails;
  selectedFile: File = null;
  fb;
  downloadURL: Observable<string>;
  errorMessage: string = '';
  successMessage: string = '';
  imageUrl: string = '';

  constructor(
    private router: Router,
    private storage: AngularFireStorage,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit(): void {
    this.serviceDetails = this.serviceDetails ? this.serviceDetails : {};
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

  deleteImageHandler() {
    this.serviceDetails.imageUrl = this.firebaseService.deleteImage(
      this.serviceDetails.imageUrl
    );
  }

  addServiceHandler(formData) {
    formData['imageUrl'] = this.fb ? this.fb : '';
    this.firebaseService
      .addService(formData)
      .then(() => {
        this.errorMessage = '';
        this.successMessage = 'Service has been added successfully!';
        this.router.navigate(['/services']);
      })
      .catch((err) => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = '';
      });
  }
}
