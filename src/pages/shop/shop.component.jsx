import React, { Component } from 'react';
import CollectionOverview from '../../components/collection-overview/collection-overview.component.jsx';
import { Route } from 'react-router-dom';
import CollectionPage from '../collection/collection.component.jsx';
import {
	db,
	convertCollectionsSnapshotToMap,
} from '../../firebase/firebase.utils.js';
import { connect } from 'react-redux';
import { updateCollections } from '../../redux/shop/shop.actions.js';
import WithSpinner from '../../components/with-loading/with-spinner.component.jsx';

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends Component {
	state = {
		isLoading: true,
		hoge: true,
	};

	unsubscribeFromSnapShot = null;

	componentDidMount() {
		const { updateCollections } = this.props;
		const collectionRef = db.collection('collections');

		this.unsubscribeFromSnapShot = collectionRef.onSnapshot((snapShot) => {
			const collectionMap = convertCollectionsSnapshotToMap(snapShot);
			updateCollections(collectionMap);
			this.setState({ isLoading: false });
		});
	}

	render() {
		const { match } = this.props;
		const { isLoading } = this.state;

		return (
			<div className='shop-page'>
				<Route
					exact
					path={`${match.path}`}
					render={(props) => (
						<CollectionOverviewWithSpinner isLoading={isLoading} {...props} />
					)}
				></Route>
				<Route
					path={`${match.path}/:categoryId`}
					render={(props) => (
						<CollectionPageWithSpinner isLoading={isLoading} {...props} />
					)}
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
