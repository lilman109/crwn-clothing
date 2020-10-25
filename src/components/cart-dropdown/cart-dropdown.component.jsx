import React from 'react';
import CustomButton from '../custom-button/custom-button.component.jsx';
import CartItem from '../cart-item/cart-item.component.jsx';
import { connect } from 'react-redux';
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

const mapStateToProps = ({ cart: { cartItems } }) => ({
	cartItems,
});

export default connect(mapStateToProps)(CartDropDown);
