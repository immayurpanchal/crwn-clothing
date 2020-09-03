import React from 'react';
import CollectionItemGQL from '../../components/CollectionItem/CollectionItem.container';
import {
	CollectionItemsContainer,
	CollectionPageContainer,
	CollectionTitle,
} from './Collection.styles';

const Collection = (props) => {
	const { collection } = props;
	const { title, items } = collection;
	return (
		<CollectionPageContainer>
			<CollectionTitle>{title}</CollectionTitle>
			<CollectionItemsContainer>
				{items.map((item) => (
					<CollectionItemGQL key={item.id} item={item} />
				))}
			</CollectionItemsContainer>
		</CollectionPageContainer>
	);
};

export default Collection;
