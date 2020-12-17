import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import 'firebase/auth';
import { IUserData } from '../shared/interfaces/user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUser: IUserData | null;

  get isLogged(): boolean {
    return !!this.currentUser ? this.currentUser.isLogged : false;
  }
  get isAdmin(): boolean {
    return !!this.currentUser ? this.currentUser.isAdmin : false;
  }

  constructor(public afAuth: AngularFireAuth, public db: AngularFirestore) {}

  doRegister(value) {
    return new Promise<any>((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(value.email, value.password)
        .then(
          (res) => {
            resolve(res);
          },
          (err) => reject(err)
        );
    });
  }

  doLogin(form) {
    return this.afAuth.setPersistence('session').then((_) => {
      return this.afAuth.signInWithEmailAndPassword(form.email, form.password);
    });
  }

  doLogout() {
    return new Promise<any>((resolve, reject) => {
      if (this.currentUser) {
        this.currentUser = null;
        sessionStorage.clear();
      } else {
        reject();
      }
    });
  }

  createUser(value) {
    return this.db.collection('users').add({
      email: value.email,
      isAdmin: false,
    });
  }

  getData(email): void {
    this.getUsers().subscribe((users) => {
      const result = users.filter((user) => user.data['email'] === email)[0];
      if (result) {
        this.currentUser = {
          id: result['id'],
          email: result.data['email'],
          isLogged: !!result.data['email'],
          isAdmin: result.data['isAdmin'],
        };
      } else {
        this.currentUser = {
          id: '',
          email: '',
          isLogged: false,
          isAdmin: false,
        };
      }
    });
  }

  getUsers() {
    return this.db
      .collection('users')
      .snapshotChanges()
      .pipe(
        map((users) => {
          return users.map((user) => {
            const data = user.payload.doc.data();
            const id = user.payload.doc.id;
            return { id, data };
          });
        })
      );
  }

  login(form) {
    return this.afAuth.setPersistence('session').then((_) => {
      return this.afAuth.signInWithEmailAndPassword(form.email, form.password);
    });
  }

  userSessionCheck() {
    const authKey = Object.keys(sessionStorage).filter((item) =>
      item.startsWith('firebase:authUser')
    )[0];

    const user = authKey
      ? JSON.parse(sessionStorage.getItem(authKey))
      : undefined;

    if (user === undefined) {
      this.currentUser = null;
    } else {
      this.getData(user.email);
    }
  }
}
