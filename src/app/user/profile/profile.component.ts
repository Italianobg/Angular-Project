import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  currentUser;
  requests;
  constructor(private userService: UserService, private db: AngularFirestore) {}

  ngOnInit(): void {
    this.currentUser = this.userService.currentUser;
    this.getData();
  }

  getData() {
    this.getRequests().subscribe((result) => {
      if (result.length === 0) {
        this.requests = undefined;
      } else {
        this.requests = result.filter(
          (request) => request.data['email'] === this.currentUser.email
        );
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
}
