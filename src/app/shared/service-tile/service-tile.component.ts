import { Component, OnInit, Input } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { UserService } from 'src/app/user/user.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-service-tile',
  templateUrl: './service-tile.component.html',
  styleUrls: ['./service-tile.component.css'],
  animations: [
    trigger('image', [
      state(
        'rest',
        style({
          transform: 'scale(1)',
        })
      ),
      state(
        'start',
        style({
          transform: 'scale(1)',
        })
      ),
      state(
        'hover',
        style({
          transform: 'scale(1.2)',
        })
      ),
      transition('rest => start', animate('1ms ease-in')),
      transition('start => hover', animate('300ms ease-in')),
      transition('hover => rest', animate('200ms ease-out')),
    ]),
    trigger('description', [
      state(
        'rest',
        style({
          transform: 'translateY(0%)',
          opacity: '1',
        })
      ),
      state(
        'start',
        style({
          transform: 'translateY(200%)',
          opacity: '0',
        })
      ),
      state(
        'hover',
        style({
          transform: 'translateY(0%)',
          opacity: '1',
        })
      ),
      transition('rest => start', animate('1ms ease-in')),
      transition('start => hover', animate('300ms ease-in')),
      transition('hover => rest', animate('200ms ease-out')),
    ]),
    trigger('title', [
      state(
        'rest',
        style({
          transform: 'translateY(0%)',
          opacity: '1',
        })
      ),
      state(
        'start',
        style({
          transform: 'translateY(-200%)',
          opacity: '0',
        })
      ),
      state(
        'hover',
        style({
          transform: 'translateY(0%)',
          opacity: '1',
        })
      ),
      transition('rest => start', animate('1ms ease-in')),
      transition('start => hover', animate('300ms ease-in')),
      transition('hover => rest', animate('200ms ease-out')),
    ]),
  ],
})
export class ServiceTileComponent implements OnInit {
  currentState: string = 'rest';
  @Input() service;
  showButton;

  constructor(
    public userService: UserService,
    public db: AngularFirestore,
    public storage: AngularFireStorage,
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    if (
      this.activatedRoute.data['_value']['title'] === 'Device Details' ||
      this.activatedRoute.data['_value']['title'] === 'HOME'
    ) {
      this.showButton = false;
    } else {
      this.showButton = true;
    }
  }

  changeMouseState(state: string): void {
    this.currentState = state;
  }

  get isLogged(): boolean {
    return this.userService ? this.userService.isLogged : false;
  }

  get isAdmin(): boolean {
    return this.userService ? this.userService.isAdmin : false;
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
