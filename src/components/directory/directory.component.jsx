import React from 'react';
import './directory.styles.scss';
import MenuItem from '../menu-item/menu-item.component.jsx';
import { selectDirectorySections } from '../../redux/directory/directory.selectors.js';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

const Directory = ({ sectionItems }) => {
	return (
		<div className='directory-menu'>
			{sectionItems.map(({ id, ...otherProps }) => {
				return <MenuItem key={id} {...otherProps} />;
			})}
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	sectionItems: selectDirectorySections,
});

export default connect(mapStateToProps)(Directory);
