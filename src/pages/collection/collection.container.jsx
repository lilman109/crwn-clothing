import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { selectIsCollectionLoaded } from '../../redux/shop/shop.selectors.js';
import WithSpinner from '../../components/with-loading/with-spinner.component.jsx';
import CollectionPage from './collection.component.jsx';

const mapStateToProps = createStructuredSelector({
	isLoading: (state) => !selectIsCollectionLoaded(state),
});

const CollectionPageContainer = compose(
	connect(mapStateToProps),
	WithSpinner
)(CollectionPage);

export default CollectionPageContainer;
