import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage'

const config = {
  apiKey: "AIzaSyCcW_1JqS55gkW0294HRh5uT3LkoQtKfXw",
  authDomain: "instorage-6b1ea.firebaseapp.com",
  databaseURL: "https://instorage-6b1ea.firebaseio.com",
  projectId: "instorage-6b1ea",
  storageBucket: "instorage-6b1ea.appspot.com",
  messagingSenderId: "588350868786",
  appId: "1:588350868786:web:5d6130acdf63b530779b2b",
  measurementId: "G-YBVXWGHM70"
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.storage = app.storage();
  }


  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();
}

export default Firebase;
