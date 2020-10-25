import React from 'react';
import CustomButton from '../custom-button/custom-button.component.jsx';
import CartItem from '../cart-item/cart-item.component.jsx';
import { connect } from 'react-redux';
import { selectCartItems } from '../../redux/cart/cart.selectors.js';
import './cart-dropdown.styles.scss';

const CartDropDown = ({ cartItems }) => {
	return (
		<div className='cart-dropdown'>
			<div className='cart-items'>
				{cartItems.map((cartItem) => (
					<CartItem key={cartItem.id} item={cartItem}></CartItem>
				))}
			</div>
			<CustomButton>Go To Checkout</CustomButton>
		</div>
	);
};

const mapStateToProps = (state) => ({
	cartItems: selectCartItems(state),
});

export default connect(mapStateToProps)(CartDropDown);
