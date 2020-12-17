import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/shared/firebase.service';
import { IRequests } from 'src/app/shared/interfaces/requests';

@Component({
  selector: 'app-repair-requests',
  templateUrl: './repair-requests.component.html',
  styleUrls: ['../../../form-style.css', './repair-requests.component.css'],
})
export class RepairRequestsComponent implements OnInit {
  requests: IRequests;
  errorMessage: string = '';
  successMessage: string = '';

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

  editStatusHandler(formData: any, id: string) {
    this.firebaseService
      .editRequest(formData, id)
      .then(() => {
        this.errorMessage = '';
        this.successMessage = 'Status updated successfully';
        setInterval(() => {
          this.successMessage = '';
        }, 3000);
      })
      .catch((err) => {
        this.errorMessage = err;
        this.successMessage = '';
        setTimeout(() => {
          this.errorMessage = '';
        }, 5000);
      });
  }
}
