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

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return;

	const userRef = db.doc(`users/${userAuth.uid}`);
	const snapShot = await userRef.get();

	if (!snapShot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData,
			});
		} catch (error) {
			console.log('error creating user', error.meassage);
		}
	}
	return userRef;
};

export const convertCollectionsSnapshotToMap = (collections) => {
	const transformedCollection = collections.docs.map((doc) => {
		const { title, items } = doc.data();

		return {
			routeName: encodeURI(title.toLowerCase()),
			id: doc.id,
			title,
			items,
		};
	});

	return transformedCollection.reduce((acc, collection) => {
		acc[collection.title.toLowerCase()] = collection;
		return acc;
	}, {});
};

export const addCollectionAndDocuments = async (
	collectionKey,
	objectsToAdd
) => {
	const collectionRef = db.collection(collectionKey);

	const batch = db.batch();
	objectsToAdd.forEach((obj) => {
		const newDocRef = collectionRef.doc();
		batch.set(newDocRef, obj);
	});

	return await batch.commit();
};

export const db = firebaseApp.firestore();
export const auth = firebaseApp.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebaseApp;
