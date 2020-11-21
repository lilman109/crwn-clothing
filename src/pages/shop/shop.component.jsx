import React from 'react';
import CollectionOverview from '../../components/collection-overview/collection-overview.component.jsx';
import { Route } from 'react-router-dom';
import CollectionPage from '../collection/collection.component.jsx';
import {
	db,
	convertCollectionsSnapshotToMap,
} from '../../firebase/firebase.utils.js';
import { connect } from 'react-redux';
import { updateCollections } from '../../redux/shop/shop.actions.js';

class ShopPage extends React.Component {
	unsubscribeFromSnapShot = null;

	componentDidMount() {
		const { updateCollections } = this.props;
		const collectionRef = db.collection('collections');

		this.unsubscribeFromSnapShot = collectionRef.onSnapshot((snapShot) => {
			const collectionMap = convertCollectionsSnapshotToMap(snapShot);
			updateCollections(collectionMap);
		});
	}

	render() {
		const { match } = this.props;
		return (
			<div className='shop-page'>
				<Route
					exact
					path={`${match.path}`}
					component={CollectionOverview}
				></Route>
				<Route
					path={`${match.path}/:categoryId`}
					component={CollectionPage}
				></Route>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	updateCollections: (collectionsMap) =>
		dispatch(updateCollections(collectionsMap)),
});

export default connect(null, mapDispatchToProps)(ShopPage);
