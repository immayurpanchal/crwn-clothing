import React from 'react';
import { graphql } from 'react-apollo';
import { gql } from 'apollo-boost';
import * as compose from 'lodash.flowright';

import CartIcon from './CartIcon';

const TOGGLE_CART_HIDDEN = gql`
	mutation ToggleCartHidden {
		toggleCartHidden @client
	}
`;

const GET_ITEM_COUNT = gql`
	{
		itemCount @client
	}
`;

const CartIconGQL = ({ data: { itemCount }, toggleCartHidden }) => (
	<CartIcon toggleCartHidden={toggleCartHidden} itemCount={itemCount} />
);
export default compose(
	graphql(GET_ITEM_COUNT),
	graphql(TOGGLE_CART_HIDDEN, { name: 'toggleCartHidden' })
)(CartIconGQL);
