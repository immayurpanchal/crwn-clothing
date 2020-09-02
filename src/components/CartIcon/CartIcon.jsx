import React from 'react';
import { connect } from 'react-redux';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import './CartIcon.scss';
import { selectCartItemsCount } from '../../redux/cart/cart.selector';
import { createStructuredSelector } from 'reselect';

const CartIcon = ({ toggleCartHidden, itemCount }) => {
	return (
		<div className='cart-icon' onClick={toggleCartHidden}>
			<ShoppingIcon className='shopping-icon' />
			<span className='item-count'>{itemCount}</span>
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	// This is called selector (value of that key)
	itemCount: selectCartItemsCount,
});

/* const mapStateToProps = (state) => ({
  // This is called selector
  itemCount: selectCartItemsCount(state)
}); */
export default connect(mapStateToProps)(CartIcon);
