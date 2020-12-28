import { takeLatest, put, all, call } from 'redux-saga/effects';
import UserActionTypes from './user.types.js';

import {
	auth,
	googleProvider,
	createUserProfileDocument,
} from '../../firebase/firebase.utils.js';

import { signInSuccess, signInFailure } from './user.actions.js';

export function* getSnapshotFromUserAuth(userAuth) {
	try {
		const userRef = yield call(createUserProfileDocument, userAuth);
		const snapShot = yield userRef.get();
		yield put(signInSuccess({ id: snapShot.id, ...snapShot.data() }));
	} catch (error) {
		yield put(signInFailure(error));
	}
}

export function* signInWithGoogle() {
	try {
		const { user } = yield auth.signInWithPopup(googleProvider);
		yield getSnapshotFromUserAuth(user);
	} catch (error) {
		yield put(signInFailure(error));
	}
}

export function* onGoogleSignInStart() {
	yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* signInWithEmail({ payload: { email, password } }) {
	try {
		const { user } = yield auth.signInWithEmailAndPassword(email, password);
		yield getSnapshotFromUserAuth(user);
	} catch (error) {
		yield put(signInFailure(error));
	}
}

export function* onEmailSignInStart() {
	yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* userSagas() {
	yield all([call(onGoogleSignInStart), call(onEmailSignInStart)]);
}
