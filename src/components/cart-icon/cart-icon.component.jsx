import React from 'react';
import { ReactComponent as ShoppingCart } from '../../assets/shopping-bag.svg';
import './cart-icon.styles.scss';
import { toggleCartHidden } from '../../redux/cart/cart.actions.js';
import { connect } from 'react-redux';

const CartIcon = ({ toggleCartHidden, cartItems }) => {
	let total = 0;
	const totalItems = cartItems.reduce((total, cartItem) => {
		return total + cartItem.quantity;
	}, total);
	return (
		<div className='cart-icon' onClick={toggleCartHidden}>
			{console.log('total', totalItems)}
			<ShoppingCart className='shopping-icon' />
			<span className='item-count'>{totalItems}</span>
		</div>
	);
};

const mapStateToProps = ({ cart: { cartItems } }) => ({
	cartItems,
});

const mapDispatchToProps = (dispatch) => ({
	toggleCartHidden: () => dispatch(toggleCartHidden()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
