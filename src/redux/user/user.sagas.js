import { takeLatest, put, all, call } from 'redux-saga/effects';
import UserActionTypes from './user.types.js';

import {
	auth,
	googleProvider,
	createUserProfileDocument,
} from '../../firebase/firebase.utils.js';

import {
	emailSignInFailure,
	emailSignInSuccess,
	googleSignInFailure,
	googleSignInSuccess,
} from './user.actions.js';

export function* signInWithGoogle() {
	try {
		const { user } = yield auth.signInWithPopup(googleProvider);
		const userRef = yield call(createUserProfileDocument, user);
		const snapShot = yield userRef.get();
		yield put(googleSignInSuccess({ id: snapShot.id, ...snapShot.data() }));
	} catch (error) {
		yield put(googleSignInFailure(error));
	}
}

export function* onGoogleSignInStart() {
	yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* signInWithEmail({ payload: { email, password } }) {
	try {
		const { user } = yield auth.signInWithEmailAndPassword(email, password);
		const userRef = yield call(createUserProfileDocument, user);
		const snapShot = yield userRef.get();
		yield put(emailSignInSuccess({ id: snapShot.id, ...snapShot.data() }));
	} catch (error) {
		yield put(emailSignInFailure(error));
	}
}

export function* onEmailSignInStart() {
	yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* userSagas() {
	yield all([call(onGoogleSignInStart), call(onEmailSignInStart)]);
}
