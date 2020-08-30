import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import CollectionOverviewContainer from '../../components/CollectionsOverview/CollectionOverview.container';
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';
import CollectionPageContainer from '../Collection/Collection.container';

const Shop = (props) => {
  const { match, fetchCollectionsStartAsync } = props;

  useEffect(() => {
    fetchCollectionsStartAsync();
  }, [fetchCollectionsStartAsync]);

  return (
    <div className="shop-page">
      {/* exact is required as path=/shop has nested routing also */}
      <Route exact path={`${match.path}`} component={CollectionOverviewContainer} />
      <Route exact path={`${match.path}/:collectionId`} component={CollectionPageContainer} />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
});

export default connect(null, mapDispatchToProps)(Shop);
