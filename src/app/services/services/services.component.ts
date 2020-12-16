import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/shared/firebase.service';
import { IServices } from '../../shared/interfaces/service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
})
export class ServicesComponent implements OnInit {
  services: IServices;

  constructor(public firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.firebaseService.getServices().subscribe((result) => {
      if (result.length === 0) {
        this.services = undefined;
      } else {
        this.services = result;
      }
    });
  }
}
