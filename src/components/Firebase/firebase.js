import app from 'firebase/app';
import 'firebase/auth';
import axios from 'axios';

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_ID
}

class Firebase {
    constructor() {
        app.initializeApp(config);

        this.auth = app.auth();

        this.googleProvider = new app.auth.GoogleAuthProvider();
    }

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignInWithGoogle = () =>
        this.auth.signInWithPopup(this.googleProvider);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = (email) =>
        this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = (password) => 
        this.auth.currentUser.updatePassword(password)

    getCurrentUser = () =>
        this.auth.currentUser;

    onAuthUserListener = (next, fallback) => (
        this.auth.onAuthStateChanged(authUser => {
            if(authUser) {
                authUser.getIdToken().then((idToken) => {
                    axios.get(
                        `http://localhost:3001/users/${authUser.uid}`,
                        {headers: {Authorization: `Bearer ${idToken}`}}
                    ).then((res) => {
                        authUser = {
                            ...authUser,
                            data: res.data
                        }
                        next(authUser);
                    }).catch(error => {
                        next(authUser);
                    });
                })
            } else {
                fallback();
            }
        })
    )
}

export default Firebase;