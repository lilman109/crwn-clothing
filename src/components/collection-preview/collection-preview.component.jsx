import React from 'react';
import './collection-preview.styles.scss';
import CollectionItem from '../collection-item/collection-item.component.jsx';
import { withRouter } from 'react-router-dom';

const CollectionPreview = ({ title, items, routeName, match, history }) => {
	return (
		<div className='collection-preview'>
			<h1
				className='title'
				onClick={() => history.push(`${match.url}/${routeName}`)}
			>
				{title.toUpperCase()}
			</h1>
			<div className='preview'>
				{items
					.filter((item, index) => index < 4)
					.map((item) => {
						return <CollectionItem key={item.id} item={item} />;
					})}
			</div>
		</div>
	);
};

export default withRouter(CollectionPreview);
