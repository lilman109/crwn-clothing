import React from 'react';

import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
	const priceForStipe = price * 100;
	const publishableKey =
		'pk_test_51HnkvICrLU6BreUeTXlDXWh76RUbaVwkdTHuup9lh3JkgMNCScgJiTIrc1vac5t2kXvATU8EtVZF2G4jQEl9Ygnk006zfcjKtc';

	const onToken = (token) => {
		console.log(token);

		alert('Payment Successful!');
	};

	return (
		<StripeCheckout
			label='Pay Now'
			name='CRWN Clothing Ltd.'
			billingAddress
			shippingAddress
			image='https://sendeyo.com/up/d/f3eb2117da'
			description={`Your total is $${price}`}
			amount={priceForStipe}
			panelLabel='Pay Now'
			token={onToken}
			stripeKey={publishableKey}
		/>
	);
};

export default StripeCheckoutButton;
