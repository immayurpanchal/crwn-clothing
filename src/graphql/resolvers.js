import { gql } from 'apollo-boost';

// typeDef should start with uppercase
export const typeDefs = gql`
	extend type Mutation {
		ToggleCartHidden: Boolean!
	}
`;

// @client informs that the value should be searched from local cache
const GET_CART_HIDDEN = gql`
	{
		cartHidden @client
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
			const { cartHidden } = cache.readQuery({ query: GET_CART_HIDDEN /* , variables: {} */ });

			cache.writeQuery({ query: GET_CART_HIDDEN, data: { cartHidden: !cartHidden } });

			return !cartHidden;
		},
	},
};
