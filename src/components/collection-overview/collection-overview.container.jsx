import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { selectCollectionFetching } from '../../redux/shop/shop.selectors.js';
import WithSpinner from '../../components/with-loading/with-spinner.component.jsx';
import CollectionOverview from './collection-overview.component.jsx';

const mapStateToProps = createStructuredSelector({
	isFetching: selectCollectionFetching,
});

const CollectionOverviewContainer = compose(
	connect(mapStateToProps),
	WithSpinner
)(CollectionOverview);

export default CollectionOverviewContainer;
