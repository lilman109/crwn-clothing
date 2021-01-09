import React from 'react';
import CustomButton from '../custom-button/custom-button.component.jsx';
import CartItem from '../cart-item/cart-item.component.jsx';
import { connect } from 'react-redux';
import { selectCartItems } from '../../redux/cart/cart.selectors.js';
import { createStructuredSelector } from 'reselect';
import './cart-dropdown.styles.scss';
import { withRouter } from 'react-router-dom';
import { toggleCartHidden } from '../../redux/cart/cart.actions.js';

const CartDropDown = ({ cartItems, history, toggleCartHidden }) => {
	return (
		<div className='cart-dropdown'>
			<div className='cart-items'>
				{cartItems.length ? (
					cartItems.map((cartItem) => (
						<CartItem key={cartItem.id} item={cartItem}></CartItem>
					))
				) : (
					<span className='empty-message'>Your cart is empty.</span>
				)}
			</div>
			<CustomButton
				disabled={!cartItems.length}
				onClick={() => {
					history.push('/checkout');
					toggleCartHidden();
				}}
			>
				Go To Checkout
			</CustomButton>
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	cartItems: selectCartItems,
});

const maptDispatchToProps = (dispatch) => ({
	toggleCartHidden: () => dispatch(toggleCartHidden()),
});

export default withRouter(
	connect(mapStateToProps, maptDispatchToProps)(CartDropDown)
);
