import { gql } from 'apollo-boost';
import { addItemToCart, getCartItemCount } from './cart.utils';

// typeDef should start with uppercase
export const typeDefs = gql`
	extend type Item {
		quantity: Int
	}
	extend type Mutation {
		ToggleCartHidden: Boolean!
		AddItemToCart(item: Item!): [Item]!
	}
`;

// @client informs that the value should be searched from local cache
const GET_CART_HIDDEN = gql`
	{
		cartHidden @client
	}
`;

const GET_CART_ITEMS = gql`
	{
		cartItems @client
	}
`;

const GET_ITEM_COUNT = gql`
	{
		itemCount @client
	}
`;

/* 
1. underscore as args shows that those should not be modified
=> _root object contains value of connected parent if there is a relational binding
=> _args obj contains that passed as argument
=> _context contains appollo cache as well as the client itself 
=> _info contains info about the query 

example: toggleCartHidden: (_root, _args, _context, _info) => {}
*/
export const resolvers = {
	Mutation: {
		toggleCartHidden: (_root, _args, { cache }) => {
			const { cartHidden } = cache.readQuery({
				query: GET_CART_HIDDEN /* , variables: {} */,
			});

			cache.writeQuery({
				query: GET_CART_HIDDEN,
				data: { cartHidden: !cartHidden },
			});

			return !cartHidden;
		},

		addItemToCart: (_root, { item }, { cache }) => {
			const { cartItems } = cache.readQuery({ query: GET_CART_ITEMS });

			const newCartItems = addItemToCart(cartItems, item);

			cache.writeQuery({
				query: GET_ITEM_COUNT,
				data: { itemCount: getCartItemCount(newCartItems) },
			});

			cache.writeQuery({
				query: GET_CART_ITEMS,
				data: { cartItems: newCartItems },
			});

			return newCartItems;
		},
	},
};
