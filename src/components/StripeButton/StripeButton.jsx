import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { removeAllCartItems } from '../../redux/cart/cart.actions';

const StripeButton = (props) => {
	const { price, history, removeAllCartItems } = props;
	const priceForStripe = price * 100;
	const publishableKey = 'pk_test_wKdTXJVjDKfLeNCkPK0pTFJk00RwisgQeD';

	// Pass this token to backend for successful payment
	const onToken = (token) => {
		const paymentUrl = process.env.REACT_APP_PAYMENT_URL || 'https://crwn-payment-server.herokuapp.com';

		axios({
			url: `${paymentUrl}/payment`,
			method: 'POST',
			data: {
				amount: priceForStripe,
				token,
			},
		})
			.then((res) => {
				removeAllCartItems();
				alert('Payment Successful!');
				history.push('/');
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

const mapDispatchToProps = (dispatch) => ({
	removeAllCartItems: () => dispatch(removeAllCartItems()),
});

export default compose(connect(null, mapDispatchToProps), withRouter)(StripeButton);
