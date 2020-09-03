import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { auth } from '../../firebase/firebase.utils';
import { selectCurrentUser } from '../../redux/user/user.selector';
import CartIconGQL from '../CartIcon/CartIcon.container';
import { HeaderContainer, LogoContainer, OptionLink, OptionsContainer } from './Header.styles';
import CartDropdownGQL from '../CartDropdown/CartDropdown.container';

const Header = ({ currentUser, hidden }) => {
	return (
		<HeaderContainer>
			<LogoContainer to='/'>
				<Logo className='logo' />
			</LogoContainer>
			<OptionsContainer>
				<OptionLink to='/shop'>Shop</OptionLink>
				<OptionLink to='/contact'>Contact</OptionLink>
				{currentUser ? (
					<OptionLink as='div' onClick={() => auth.signOut()}>
						Sign Out
					</OptionLink>
				) : (
					<OptionLink to='/signin'>Sign In</OptionLink>
				)}
				<CartIconGQL />
			</OptionsContainer>
			{hidden ? null : <CartDropdownGQL />}
		</HeaderContainer>
	);
};

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
});

/* const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
  hidden: selectCartHidden(state)
}); */

/* const mapStateToProps = (state) => ({
  currentUser:  state.user.currentUser,
  hidden: state.cart.hidden
});
 */
export default connect(mapStateToProps)(Header);
