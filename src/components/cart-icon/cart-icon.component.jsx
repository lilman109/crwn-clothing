import React from 'react';
import { ReactComponent as ShoppingCart } from '../../assets/shopping-bag.svg';
import './cart-icon.styles.scss';
import { toggleCartHidden } from '../../redux/cart/cart.actions.js';
import { connect } from 'react-redux';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors.js';

const CartIcon = ({ toggleCartHidden, itemCount }) => {
	return (
		<div className='cart-icon' onClick={toggleCartHidden}>
			<ShoppingCart className='shopping-icon' />
			<span className='item-count'>{itemCount}</span>
		</div>
	);
};

const mapStateToProps = (state) => ({
	itemCount: selectCartItemsCount(state),
});

const mapDispatchToProps = (dispatch) => ({
	toggleCartHidden: () => dispatch(toggleCartHidden()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
