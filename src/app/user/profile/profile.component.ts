import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/shared/firebase.service';
import { IUser } from 'src/app/shared/interfaces/user';
import { IRequests } from 'src/app/shared/interfaces/requests';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  currentUser: IUser;
  requests: IRequests;

  constructor(
    private userService: UserService,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.userService.currentUser;
    this.getData();
  }

  getData() {
    this.firebaseService.getRequests().subscribe((result) => {
      if (result.length === 0) {
        this.requests = undefined;
      } else {
        this.requests = result.filter(
          (request) => request.data['email'] === this.currentUser.email
        );
      }
    });
  }
}
