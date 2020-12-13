import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-repair-requests',
  templateUrl: './repair-requests.component.html',
  styleUrls: ['../../../form-style.css', './repair-requests.component.css'],
})
export class RepairRequestsComponent implements OnInit {
  requests;

  constructor(public db: AngularFirestore) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.getRequests().subscribe((result) => {
      if (result.length === 0) {
        this.requests = undefined;
      } else {
        this.requests = result;
        console.log(this.requests);
      }
    });
  }

  getRequests() {
    return this.db
      .collection('requests')
      .snapshotChanges()
      .pipe(
        map((requests) => {
          return requests.map((requests) => {
            const data = requests.payload.doc.data();
            const id = requests.payload.doc.id;
            return { id, data };
          });
        })
      );
  }

  editStatusHandler(formData, id) {
    console.log(formData, id);
    this.editRequest(formData, id);
  }

  editRequest(status, id) {
    return this.db.collection('requests').doc(id).update(status);
  }
}
