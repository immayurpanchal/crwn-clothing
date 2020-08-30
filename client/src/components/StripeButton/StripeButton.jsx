import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeButton = (props) => {
  const { price } = props;
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_wKdTXJVjDKfLeNCkPK0pTFJk00RwisgQeD';

  // Pass this token to backend for successful payment
  const onToken = (token) => {
    console.log(token);
    alert('Payment Successful');
  };
  return (
    <>
      <StripeCheckout
        label="Pay Now"
        name="CRWN Clothing Ltd."
        billingAddress
        shippingAddress
        image="https://svgshare.com/i/CUz.svg"
        description={`Your Total is $${price}`}
        amount={priceForStripe}
        panelLabel="Pay Now"
        token={onToken}
        stripeKey={publishableKey}
      />
    </>
  );
};

export default StripeButton;
