import ShopActionTypes from './shop.types.js';
import {
	db,
	convertCollectionsSnapshotToMap,
} from '../../firebase/firebase.utils.js';

export const fetchCollectionsStart = () => ({
	type: ShopActionTypes.FETCH_COLLECTION_START,
});

export const fetchCollectionsSuccess = (collectionsMap) => ({
	type: ShopActionTypes.FETCH_COLLECTION_SUCCESS,
	payload: collectionsMap,
});

export const fetchCollectionsFailure = (errorMessage) => ({
	type: ShopActionTypes.FETCH_COLLECTION_FAILURE,
	payload: errorMessage,
});

export const fetchCollectionsStartAsync = () => {
	return (dispatch) => {
		const collectionRef = db.collection('collections');
		dispatch(fetchCollectionsStart());

		collectionRef
			.get()
			.then((snapShot) => {
				const collectionMap = convertCollectionsSnapshotToMap(snapShot);
				dispatch(fetchCollectionsSuccess(collectionMap));
			})
			.catch((error) => dispatch(fetchCollectionsFailure(error.message)));
	};
};
