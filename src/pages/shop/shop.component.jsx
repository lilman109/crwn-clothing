import React, { Component } from 'react';
import './shop.data.js';
import SHOP_DATA from './shop.data.js';
import CollectionPreview from '../../components/collection-preview/collection-preview.component.jsx';

class ShopPage extends Component {
	constructor() {
		super();

		this.state = {
			collections: SHOP_DATA,
		};
	}

	render() {
		return (
			<div className="shop-page">
				{this.state.collections.map(({ id, ...otherCollectionProps }) => {
					return <CollectionPreview key={id} {...otherCollectionProps} />;
				})}
			</div>
		);
	}
}

export default ShopPage;
