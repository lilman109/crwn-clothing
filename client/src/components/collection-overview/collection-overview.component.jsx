import React from 'react';

import CollectionPreview from '../../components/collection-preview/collection-preview.component.jsx';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCollectionsForPreview } from '../../redux/shop/shop.selectors.js';

import './collection-overview.styles.scss';

const CollectionOverview = ({ collections }) => {
	return (
		<div className='collection-overview'>
			{collections.map(({ id, ...otherCollectionProps }) => {
				return <CollectionPreview key={id} {...otherCollectionProps} />;
			})}
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	collections: selectCollectionsForPreview,
});

export default connect(mapStateToProps)(CollectionOverview);
