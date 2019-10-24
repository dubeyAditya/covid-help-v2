import config from "../config";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
const { firebaseConfig } = config;

interface IFireBaseAdapter {
  firebaseAppAuth: any;
  providers: any;
  firestore: any;
}

class FireBaseAdapter implements IFireBaseAdapter {
  firebaseAppAuth: any;
  providers: any;
  firestore: any;
  storage: any;

  constructor(firebaseConfig: any) {
    const firebaseApp: any = firebase.initializeApp(firebaseConfig);
    this.firebaseAppAuth = firebaseApp.auth();
    this.providers = {
      googleProvider: new firebase.auth.GoogleAuthProvider()
    };
    this.firestore = firebase.firestore();
    this.storage =  firebase.storage();
  }

  getFireStore() {
    return this.firestore;
  }

  getAuth() {
    return this.firebaseAppAuth;
  }

  getStorage() {
    return this.storage;
  }

}

export default new FireBaseAdapter(firebaseConfig);
