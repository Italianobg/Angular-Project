import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['../../../form-style.css', './edit-users.component.css'],
})
export class EditUsersComponent implements OnInit {
  users: any;
  currentUser: any;

  constructor(public db: AngularFirestore, public userService: UserService) {
    this.users = this.getData();
  }

  ngOnInit(): void {}

  getData() {
    this.getUsers().subscribe((result) => {
      this.users = result;
      this.currentUser = this.userService.currentUser;
    });
  }

  getUsers() {
    return this.db
      .collection('users')
      .snapshotChanges()
      .pipe(
        map((user) => {
          return user.map((user) => {
            const data = user.payload.doc.data();
            const id = user.payload.doc.id;
            return { id, data };
          });
        })
      );
  }

  removeAdmin(userId, email) {
    return new Promise<any>((resolve) => {
      this.db
        .collection('users')
        .doc(userId)
        .set({ email: email, isAdmin: false });
      resolve();
    });
  }

  addAdmin(userId, email) {
    return new Promise<any>((resolve) => {
      this.db
        .collection('users')
        .doc(userId)
        .set({ email: email, isAdmin: true });
      resolve();
    });
  }
}
