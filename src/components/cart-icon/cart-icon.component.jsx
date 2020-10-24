import React from 'react';
import { ReactComponent as ShoppingCart } from '../../assets/shopping-bag.svg';
import './cart-icon.styles.scss';
import toggleCartHidden from '../../redux/cart/cart.actions.js';
import { connect } from 'react-redux';

const CartIcon = ({ toggleCartHidden, value }) => {
	return (
		<div className='cart-icon' onClick={toggleCartHidden}>
			<ShoppingCart className='shopping-icon' />
			<span className='item-count'>{value}</span>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => ({
	toggleCartHidden: () => dispatch(toggleCartHidden()),
});

export default connect(null, mapDispatchToProps)(CartIcon);
