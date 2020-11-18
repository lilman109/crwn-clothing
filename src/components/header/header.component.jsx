import React from 'react';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { auth } from '../../firebase/firebase.utils.js';
import { connect } from 'react-redux';
import CartIcon from '../cart-icon/cart-icon.component.jsx';
import CartDropDown from '../cart-dropdown/cart-dropdown.component.jsx';
import { selectCartHidden } from '../../redux/cart/cart.selectors.js';
import { selectCurrentUser } from '../../redux/user/user.selectors.js';
import { createStructuredSelector } from 'reselect';
import {
	HeaderContainer,
	LogoContainer,
	OptionContainer,
	OptionLink,
} from './header.styles.jsx';

const Header = ({ currentUser, hidden }) => {
	return (
		<HeaderContainer>
			<LogoContainer to='/'>
				<Logo className='logo' />
			</LogoContainer>
			<OptionContainer>
				<OptionLink to='/shop'>SHOP</OptionLink>
				<OptionLink to='/shop'>CONTACT</OptionLink>
				{currentUser ? (
					<OptionLink as='div' onClick={() => auth.signOut()}>
						SIGN OUT
					</OptionLink>
				) : (
					<OptionLink to='/sign-in'>SIGN IN</OptionLink>
				)}
				<CartIcon />
			</OptionContainer>
			{hidden ? null : <CartDropDown />}
		</HeaderContainer>
	);
};

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	hidden: selectCartHidden,
});

export default connect(mapStateToProps)(Header);
