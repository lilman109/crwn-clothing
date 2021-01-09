import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import {
	selectCartItems,
	selectCartTotalPrice,
} from '../../redux/cart/cart.selectors.js';
import CheckoutItem from '../../components/checkout-item/checkout-item.component.jsx';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component.jsx';

import './checkout.styles.scss';

const CheckOut = ({ cartItems, totalPrice }) => {
	return (
		<div className='checkout-page'>
			<div className='checkout-header'>
				<div className='header-block'>Product</div>
				<div className='header-block'>Description</div>
				<div className='header-block'>Quantity</div>
				<div className='header-block'>Price</div>
				<div className='header-block'>Remove</div>
			</div>
			{cartItems.map((cartItem) => {
				return <CheckoutItem cartItem={cartItem} />;
			})}
			<div className='total'>Total ${totalPrice}</div>
			<div className='test-warning'>
				*Please use the following test credit card for payments*
				<br />
				4242 4242 4242 4242 - Exp: (future date) - CVV:123
			</div>
			<StripeCheckoutButton price={totalPrice} />
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	cartItems: selectCartItems,
	totalPrice: selectCartTotalPrice,
});

export default connect(mapStateToProps)(CheckOut);
