import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

  // Initialize Firebase
  const config = {
    apiKey: "AIzaSyAviyfXfJkFqwPQ6rRaVn-rtg9vRWWPl0U",
    authDomain: "cartograperschisel.firebaseapp.com",
    databaseURL: "https://cartograperschisel.firebaseio.com",
    projectId: "cartograperschisel",
    storageBucket: "cartograperschisel.appspot.com",
    messagingSenderId: "332644850082"
  };

class Firebase {
    constructor(){
        app.initializeApp(config);
        this.auth = app.auth();
        this.db = app.database();
    }

    //***Auth API ***/
    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);
    
    doSendEmailVerification = () => 
        this.auth.currentUser.sendEmailVerification({
          url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
        });
    
    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

    //***Merge Auth and DB User API ***/

    onAuthUserListener = (next, fallback) =>
      this.auth.onAuthStateChanged(authUser => {
        if (authUser) {
          this.user(authUser.uid)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val();

            //default empty roles
            if (!dbUser.roles) {
              dbUser.roles = [];
            }

            //merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser,
            };

            next(authUser);
          });
        }else {
          fallback();
        }
      });

    //***User API ***/

    user = uid => this.db.ref(`users/${uid}`);
    users = () => this.db.ref('users');
}

export default Firebase;