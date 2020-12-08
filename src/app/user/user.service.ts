import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  get isLogged(): boolean { return false; }
  get isAdmin(): boolean { return false; }

  constructor(
    public afAuth: AngularFireAuth,
    public db: AngularFirestore) { }

  doRegister(value){
    return new Promise<any>((resolve, reject) => {      
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }

  doLogin(value){
    return new Promise<any>((resolve, reject) => {      
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }

  createUser(value){
    return this.db.collection('users').add({
      email: value.email,
      isAdmin: false
    });
  }
}
