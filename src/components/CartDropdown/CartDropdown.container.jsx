import React from 'react';
import { gql } from 'apollo-boost';
import { Query, Mutation } from 'react-apollo';
import CartDropdown from './CartDropdown';

const TOGGLE_CART_HIDDEN = gql`
	mutation ToggleCartHidden {
		toggleCartHidden @client
	}
`;

const GET_CART_ITEMS = gql`
	{
		cartItems @client
	}
`;

const CartDropdownGQL = () => (
	<Mutation mutation={TOGGLE_CART_HIDDEN}>
		{(toggleCartHidden) => (
			<Query query={GET_CART_ITEMS}>
				{({ data: { cartItems } }) => <CartDropdown cartItems={cartItems} toggleCartHidden={toggleCartHidden} />}
			</Query>
		)}
	</Mutation>
);

export default CartDropdownGQL;
