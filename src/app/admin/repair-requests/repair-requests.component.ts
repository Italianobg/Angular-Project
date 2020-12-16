import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/shared/firebase.service';

@Component({
  selector: 'app-repair-requests',
  templateUrl: './repair-requests.component.html',
  styleUrls: ['../../../form-style.css', './repair-requests.component.css'],
})
export class RepairRequestsComponent implements OnInit {
  requests;

  constructor(public firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.firebaseService.getRequests().subscribe((result) => {
      if (result.length === 0) {
        this.requests = undefined;
      } else {
        this.requests = result;
      }
    });
  }

  editStatusHandler(formData, id) {
    this.firebaseService.editRequest(formData, id);
  }
}
