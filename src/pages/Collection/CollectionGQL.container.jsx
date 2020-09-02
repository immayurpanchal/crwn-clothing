import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import Spinner from '../../components/Spinner';
import Collection from './Collection';

const GET_COLLECTION_BY_TITLE = gql`
	query getCollectionsByTitle($title: String!) {
		getCollectionsByTitle(title: $title) {
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

const CollectionContainerGQL = ({ match }) => {
	return (
		<Query query={GET_COLLECTION_BY_TITLE} variables={{ title: match.params.collectionId }}>
			{({ loading, data }) => {
				if (loading) return <Spinner />;
				return <Collection collection={data.getCollectionsByTitle} />;
			}}
		</Query>
	);
};

export default CollectionContainerGQL;
