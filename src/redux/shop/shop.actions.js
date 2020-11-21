import ShopActionTypes from './shop.types.js';

export const updateCollections = (collectionsMap) => ({
	type: ShopActionTypes.UPDATE_COLLECTION,
	payload: collectionsMap,
});
