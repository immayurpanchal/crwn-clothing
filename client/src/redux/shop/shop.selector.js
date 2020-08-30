import { createSelector } from 'reselect';

/* const COLLECTION_ID_MAP = {
  hats: 1,
  sneakers: 2,
  jackets: 3,
  womens: 4,
  mens: 5
}; */
const selectShop = (state) => state.shop;

export const selectCollections = createSelector([selectShop], (shop) => shop.collections);

export const selectCollection = (collectionUrlParams) =>
  createSelector([selectCollections], (collections) =>
    collections ? collections[collectionUrlParams] : null
  );

/* export const selectCollection = (collectionUrlParams) =>
  createSelector([selectCollections], (collections) =>
    collections.find((collection) => collection.id === COLLECTION_ID_MAP[collectionUrlParams])
  ); */

export const selectCollectionForPreview = createSelector([selectCollections], (collections) =>
  collections ? Object.values(collections) : []
);

export const selectIsCollectionFetching = createSelector([selectShop], (shop) => shop.isFetching);

export const selectIsCollectionsLoaded = createSelector([selectShop], (shop) => !!shop.collections);
