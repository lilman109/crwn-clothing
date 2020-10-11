import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
	apiKey: 'AIzaSyAnRPOYpVIyG8UoYhjw9UPXj4uxPASUcjI',
	authDomain: 'crwn-db-8a909.firebaseapp.com',
	databaseURL: 'https://crwn-db-8a909.firebaseio.com',
	projectId: 'crwn-db-8a909',
	storageBucket: 'crwn-db-8a909.appspot.com',
	messagingSenderId: '605447960227',
	appId: '1:605447960227:web:f327cde5fe4e4ad6a4f116',
	measurementId: 'G-3BXXQQ784G',
});

export const db = firebaseApp.firestore();
export const auth = firebaseApp.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebaseApp;
