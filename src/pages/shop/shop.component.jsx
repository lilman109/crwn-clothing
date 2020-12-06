import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCollectionsStart } from '../../redux/shop/shop.actions.js';
import CollectionOverviewContainer from '../../components/collection-overview/collection-overview.container.jsx';
import CollectionPageContainer from '../../pages/collection/collection.container.jsx';

class ShopPage extends Component {
	componentDidMount() {
		const { fetchCollectionsStart } = this.props;
		fetchCollectionsStart();
	}

	render() {
		const { match } = this.props;

		return (
			<div className='shop-page'>
				<Route
					exact
					path={`${match.path}`}
					component={CollectionOverviewContainer}
				></Route>
				<Route
					path={`${match.path}/:categoryId`}
					component={CollectionPageContainer}
				></Route>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});

export default connect(null, mapDispatchToProps)(ShopPage);
