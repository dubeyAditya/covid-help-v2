import config from "../config";
import * as firebase from "firebase/app";
import "firebase/auth";
const { firebaseConfig } = config;

interface IFireBaseAdapter {
  firebaseAppAuth: any;
  providers: any;
}

class FireBaseAdapter implements IFireBaseAdapter {
  firebaseAppAuth: any;
  providers: any;

  constructor(firebaseConfig: any) {
    const firebaseApp: any = firebase.initializeApp(firebaseConfig);
    this.firebaseAppAuth = firebaseApp.auth();
    this.providers = {
      googleProvider: new firebase.auth.GoogleAuthProvider()
    };
  }
}

export default new FireBaseAdapter(firebaseConfig);
