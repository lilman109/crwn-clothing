import React, { Component } from 'react';
import CollectionOverview from '../../components/collection-overview/collection-overview.component.jsx';
import { Route } from 'react-router-dom';
import CollectionPage from '../collection/collection.component.jsx';
import { connect } from 'react-redux';
import WithSpinner from '../../components/with-loading/with-spinner.component.jsx';
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions.js';
import { createStructuredSelector } from 'reselect';
import {
	selectCollectionFetching,
	selectIsCollectionLoaded,
} from '../../redux/shop/shop.selectors.js';

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends Component {
	unsubscribeFromSnapShot = null;

	componentDidMount() {
		const { fetchCollectionsStartAsync } = this.props;
		fetchCollectionsStartAsync();
	}

	render() {
		const { match, isFetching, isLoaded } = this.props;

		return (
			<div className='shop-page'>
				<Route
					exact
					path={`${match.path}`}
					render={(props) => (
						<CollectionOverviewWithSpinner isLoading={isFetching} {...props} />
					)}
				></Route>
				<Route
					path={`${match.path}/:categoryId`}
					render={(props) => (
						<CollectionPageWithSpinner isLoading={!isLoaded} {...props} />
					)}
				></Route>
			</div>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	isFetching: selectCollectionFetching,
	isLoaded: selectIsCollectionLoaded,
});

const mapDispatchToProps = (dispatch) => ({
	fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
