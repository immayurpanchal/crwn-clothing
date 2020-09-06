import React, { useEffect, lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';
import Spinner from '../../components/Spinner';

const CollectionOverviewContainer = lazy(() =>
	import('../../components/CollectionsOverview/CollectionOverview.container')
);

const CollectionPageContainer = lazy(() =>
	import('../Collection/Collection.container')
);

const Shop = (props) => {
	const { match, fetchCollectionsStartAsync } = props;

	useEffect(() => {
		fetchCollectionsStartAsync();
	}, [fetchCollectionsStartAsync]);

	return (
		<div className='shop-page'>
			{/* exact is required as path=/shop has nested routing also */}
			<Suspense fallback={<Spinner />}>
				<Route
					exact
					path={`${match.path}`}
					component={CollectionOverviewContainer}
				/>
				<Route
					exact
					path={`${match.path}/:collectionId`}
					component={CollectionPageContainer}
				/>
			</Suspense>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => ({
	fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
});

export default connect(null, mapDispatchToProps)(Shop);
