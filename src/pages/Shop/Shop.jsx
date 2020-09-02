import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
// import CollectionOverviewContainer from '../../components/CollectionsOverview/CollectionOverview.container';
import CollectionOverviewGQL from '../../components/CollectionsOverviewContainer';
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';
import CollectionContainerGQL from '../Collection/CollectionGQL.container';
// import CollectionPageContainer from '../Collection/Collection.container';

const Shop = (props) => {
	const { match, fetchCollectionsStartAsync } = props;

	useEffect(() => {
		fetchCollectionsStartAsync();
	}, [fetchCollectionsStartAsync]);

	return (
		<div className='shop-page'>
			{/* exact is required as path=/shop has nested routing also */}
			{/* <Route exact path={`${match.path}`} component={CollectionOverviewContainer} /> */}
			<Route exact path={`${match.path}`} component={CollectionOverviewGQL} />
			{/* <Route exact path={`${match.path}/:collectionId`} component={CollectionPageContainer} /> */}
			<Route exact path={`${match.path}/:collectionId`} component={CollectionContainerGQL} />
		</div>
	);
};

const mapDispatchToProps = (dispatch) => ({
	fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
});

export default connect(null, mapDispatchToProps)(Shop);
