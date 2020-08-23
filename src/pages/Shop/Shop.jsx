import React from 'react';
import CollectionsOverview from '../../components/CollectionsOverview';
import { Route } from 'react-router-dom';
import Collection from '../Collection';

const Shop = (props) => {
  const { match } = props;
  return (
    <div className="shop-page">
      {/* exact is required as path=/shop has nested routing also */}
      <Route exact path={`${match.path}`} component={CollectionsOverview} />
      <Route exact path={`${match.path}/:collectionId`} component={Collection} />
    </div>
  );
};

export default Shop;
