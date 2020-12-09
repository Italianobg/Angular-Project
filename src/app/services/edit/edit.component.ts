import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { AdminService } from '../../admin/admin.service'


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['../../../form-style.css','./edit.component.css']
})
export class EditComponent implements OnInit {

  serviceDetails;
  selectedFile: File = null;
  fb;
  downloadURL: Observable<string>;
  errorMessage: string = '';
  successMessage: string = '';
  imageUrl: string = '';

  constructor(
    public db: AngularFirestore,
    private router: Router,
    private storage: AngularFireStorage,
    public activatedRoute: ActivatedRoute,
    private adminService: AdminService) {
      const serviceId = activatedRoute.snapshot.params.id;
      this.getData(serviceId);
     }

  ngOnInit(): void {
  }

  getData(serviceId){    
    this.getServiceDetails(serviceId)
    .subscribe(result => {
      this.serviceDetails = result;
      this.serviceDetails['id'] = serviceId;   
    })
  }

  getServiceDetails(serviceId){
    return this.db.collection('services').doc(serviceId).valueChanges();
  }

    deleteImage(){
      return this.serviceDetails.imageUrl='';
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
            this.downloadURL.subscribe(url => {
              if (url) {
                this.fb = url;
              }
              console.log(this.fb);
            });
          })
        )
        .subscribe(url => {
          if (url) {
            console.log(url);
          }
        });
    }


    editServiceHandler(formData){
      formData['imageUrl']= this.fb? this.fb : this.serviceDetails.imageUrl;
      this.adminService.editService(this.serviceDetails.id, formData)
      .then(res => {
        this.errorMessage = "";
        this.successMessage = "Service has been successfully edited!";
        this.router.navigate(['/services']);
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = "";
      })
    }
  
}
