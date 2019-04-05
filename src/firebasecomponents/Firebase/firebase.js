import app from 'firebase/app';
import 'firebase/auth';

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAviyfXfJkFqwPQ6rRaVn-rtg9vRWWPl0U",
    authDomain: "cartograperschisel.firebaseapp.com",
    databaseURL: "https://cartograperschisel.firebaseio.com",
    projectId: "cartograperschisel",
    storageBucket: "cartograperschisel.appspot.com",
    messagingSenderId: "332644850082"
  };

class FireBase {
    constructor(){
        app.initializeApp(config);
        this.auth = app.auth();
    }

    //***Auth API ***/
    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);
    
    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);
}

export default Firebase;