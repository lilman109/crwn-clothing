import { call, put, takeLatest } from 'redux-saga/effects';
import {
	db,
	convertCollectionsSnapshotToMap,
} from '../../firebase/firebase.utils.js';
import {
	fetchCollectionsSuccess,
	fetchCollectionsFailure,
} from './shop.actions.js';
import ShopActionTypes from './shop.types.js';

export function* fectchCollectionsAsync() {
	try {
		const collectionRef = db.collection('collections');
		const snapShot = yield collectionRef.get();
		const collectionMap = yield call(convertCollectionsSnapshotToMap, snapShot);
		yield put(fetchCollectionsSuccess(collectionMap));
	} catch (error) {
		yield put(fetchCollectionsFailure(error.message));
	}
}

export function* fetchCollectionsStart() {
	yield takeLatest(
		ShopActionTypes.FETCH_COLLECTION_START,
		fectchCollectionsAsync
	);
}
