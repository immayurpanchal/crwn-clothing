import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeButton = (props) => {
	const { price } = props;
	const priceForStripe = price * 100;
	const publishableKey = 'pk_test_wKdTXJVjDKfLeNCkPK0pTFJk00RwisgQeD';

	// Pass this token to backend for successful payment
	const onToken = (token) => {
		axios({
			url: 'payment',
			method: 'POST',
			data: {
				amount: priceForStripe,
				token,
			},
		})
			.then((res) => {
				alert('Payment Successful!');
			})
			.catch((err) => {
				console.log('Payment Error: ');
				console.log(err);
				alert('There was an issue for the payment. Please sure you use the provided credit card');
			});
	};
	return (
		<>
			<StripeCheckout
				label='Pay Now'
				name='CRWN Clothing Ltd.'
				billingAddress
				shippingAddress
				image='https://svgshare.com/i/CUz.svg'
				description={`Your Total is $${price}`}
				amount={priceForStripe}
				panelLabel='Pay Now'
				token={onToken}
				stripeKey={publishableKey}
			/>
		</>
	);
};

export default StripeButton;
