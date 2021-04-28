import config from "../config";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/database";
const { firebaseConfig } = config;

class FireBaseAdapter {

  constructor(firebaseConfig) {
    const firebaseApp = firebase.initializeApp(firebaseConfig);
    this.firebaseAppAuth = firebaseApp.auth();
    this.providers = {
      googleProvider: new firebase.auth.GoogleAuthProvider()
    };
    this.firestore = firebase.firestore();
    this.storage = firebase.storage();
    this.rtdb = firebase.database();
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

  getDatabase() {
    return this.rtdb;
  }

  subscribeDb(id, cb) {
    const ref = this.getDatabase().ref().child(id);
    ref.on("value", snap => {
      cb(snap.val());
      console.log(snap.val());
    });
    return this
  }

}

export default new FireBaseAdapter(firebaseConfig);
