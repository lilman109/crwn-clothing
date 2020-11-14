import React from 'react';
import CollectionOverview from '../../components/collection-overview/collection-overview.component.jsx';
import { Route } from 'react-router-dom';
import CollectionPage from '../collection/collection.component.jsx';

const ShopPage = ({ match }) => {
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
};

export default ShopPage;
