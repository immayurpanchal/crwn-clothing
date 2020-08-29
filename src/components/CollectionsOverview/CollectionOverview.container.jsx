import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectIsCollectionFetching } from '../../redux/shop/shop.selector';
import WithSpinner from '../WithSpinner/WithSpinner';
import CollectionsOverview from './CollectionsOverview';
import { compose } from 'redux';

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionFetching
});

// const CollectionOverviewContainer = connect(mapStateToProps)(WithSpinner(CollectionsOverview));

const CollectionOverviewContainer = compose(
  connect(mapStateToProps), // 2. Inner
  WithSpinner // 1. Outer
)(CollectionsOverview);

export default CollectionOverviewContainer;
