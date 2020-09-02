import React from 'react';
import CollectionItem from '../../components/CollectionItem';
import { CollectionItemsContainer, CollectionPageContainer, CollectionTitle } from './Collection.styles';

const Collection = (props) => {
	const { collection } = props;
	const { title, items } = collection;
	return (
		<CollectionPageContainer>
			<CollectionTitle>{title}</CollectionTitle>
			<CollectionItemsContainer>
				{items.map((item) => (
					<CollectionItem key={item.id} item={item} />
				))}
			</CollectionItemsContainer>
		</CollectionPageContainer>
	);
};

export default Collection;
