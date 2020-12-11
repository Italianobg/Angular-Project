import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from 'src/app/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
})
export class ServicesComponent implements OnInit {
  services: Array<any>;

  constructor(
    public userService: UserService,
    public db: AngularFirestore,
    public storage: AngularFireStorage,
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) {}

  get isLogged(): boolean {
    return this.userService ? this.userService.isLogged : false;
  }

  get isAdmin(): boolean {
    return this.userService ? this.userService.isAdmin : false;
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.getServices().subscribe((result) => {
      if (result.length === 0) {
        this.services = undefined;
      } else {
        this.services = result;
      }
    });
  }

  getServices() {
    return this.db.collection('services').snapshotChanges();
  }

  deleteServiceHandler(serviceId, imageUrl) {
    this.deleteDevice(serviceId).then(
      (res) => {
        this.storage.refFromURL(imageUrl).delete();
        this.router.navigate(['/services']);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteDevice(serviceKey) {
    return this.db.collection('services').doc(serviceKey).delete();
  }
}
