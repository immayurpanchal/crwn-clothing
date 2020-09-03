import React from 'react';
import { withRouter } from 'react-router-dom';
import CartItem from '../CartItem';
import CustomButton from '../CustomButton';
import './CartDropdown.scss';

const CartDropdown = ({ cartItems, history, toggleCartHidden }) => {
	return (
		<div className='cart-dropdown'>
			<div className='cart-items'>
				{cartItems.length ? (
					cartItems.map((cartItem) => (
						<CartItem key={cartItem.id} item={cartItem} />
					))
				) : (
					<span className='empty-message'>Your Cart is empty</span>
				)}
			</div>
			<CustomButton
				onClick={() => {
					history.push('/checkout');
					toggleCartHidden();
				}}
			>
				GO TO CHECKOUT
			</CustomButton>
		</div>
	);
};

export default withRouter(CartDropdown);
