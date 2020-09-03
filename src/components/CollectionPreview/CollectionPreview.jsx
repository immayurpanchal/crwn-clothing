import React from 'react';
import { withRouter } from 'react-router-dom';
import CollectionItemGQL from '../CollectionItem/CollectionItem.container';
import {
	CollectionPreviewContainer,
	PreviewContainer,
	TitleContainer,
} from './CollectionPreview.styles';

const CollectionPreview = (props) => {
	const { title, items, history, match, routeName } = props;
	return (
		<CollectionPreviewContainer>
			<TitleContainer
				onClick={() => history.push(`${match.path}/${routeName}`)}
			>
				{title.toUpperCase()}
			</TitleContainer>
			<PreviewContainer>
				{items
					.filter((item, idx) => idx < 4)
					.map((item) => (
						<CollectionItemGQL key={item.id} item={item} />
					))}
			</PreviewContainer>
		</CollectionPreviewContainer>
	);
};

export default withRouter(CollectionPreview);
