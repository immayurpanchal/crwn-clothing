import { createSelector } from 'reselect';

const selectCart = (state) => state.cart;

// const selectUser = (state) => state.user;

export const selectCartItems = createSelector(
  // pass only specific state item instead of the entire state
  [selectCart /* , selectUser */],
  (cart /* , user */) => cart.cartItems
);

export const selectCartItemsCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity, 0)
);
