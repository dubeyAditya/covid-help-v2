import config from "../config";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
const { firebaseConfig } = config;

interface IFireBaseAdapter {
  firebaseAppAuth: any;
  providers: any;
  firestore: any;
}

class FireBaseAdapter implements IFireBaseAdapter {
  firebaseAppAuth: any;
  providers: any;
  firestore:any;

  constructor(firebaseConfig: any) {
    const firebaseApp: any = firebase.initializeApp(firebaseConfig);
    this.firebaseAppAuth = firebaseApp.auth();
    this.providers = {
      googleProvider: new firebase.auth.GoogleAuthProvider()
    };
    this.firestore = firebase.firestore();
  }
  
  getFireStore(){
      return this.firestore;
  }

  getAuth(){
    return this.firebaseAppAuth;
  }
  
}

export default new FireBaseAdapter(firebaseConfig);
