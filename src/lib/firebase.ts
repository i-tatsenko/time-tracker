import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const config = {
    apiKey: "AIzaSyAtxW2QAFWpShTcS8dWzWI8DYqwhB0-fwE",
    authDomain: "time-tracker-za.firebaseapp.com",
    projectId: "time-tracker-za",
    databaseURL: "https://time-tracker-za.firebaseio.com",
    appId: "1:33557037156:web:ce22856f9cc00e6745df71"
};
const provider = new firebase.auth.GoogleAuthProvider();
const app = firebase.initializeApp(config);
const auth = app.auth();
const firestore = app.firestore();


export function onUserUpdate(callback: (u: firebase.User | null) => void) {
    auth.onAuthStateChanged(u => callback(u))
}

export function login() {
    return auth.signInWithPopup(provider)
        .then((result: firebase.auth.UserCredential) => {
        })
        .catch(e => console.log("Exception during log in", e))
}

export function logout(): Promise<void> {
    return auth.signOut()
}

export function db() {
    return firestore;
}

export function flatten(o: any) {
    const res: any = Object.assign({}, o);
    for (const key in Object.keys(res)) {
        if (res[key] === undefined) {
            delete res[key];
        }
    }
    return res;
}

