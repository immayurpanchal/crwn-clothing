import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import CollectionsOverview from '../CollectionsOverview/CollectionsOverview';
import Spinner from '../Spinner';

const GET_COLLECTIONS = gql`
	{
		collections {
			id
			title
			items {
				id
				name
				price
				imageUrl
			}
		}
	}
`;
const CollectionsOverviewContainer = () => (
	<Query query={GET_COLLECTIONS}>
		{({ loading, error, data }) => {
			if (loading) return <Spinner />;
			return <CollectionsOverview collections={data.collections} />;
		}}
	</Query>
);

export default CollectionsOverviewContainer;
