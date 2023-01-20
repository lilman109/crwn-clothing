import React, { useEffect } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component.jsx';
import ShopPage from './pages/shop/shop.component.jsx';
import SignInSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx';
import Header from './components/header/header.component.jsx';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selectors.js';
import CheckOut from './pages/checkout/checkout.component.jsx';
import { checkUserSession } from './redux/user/user.actions';

const App = ({ checkUserSession, currentUser }) => {
	useEffect(() => {
		console.log('check user session');
		checkUserSession();
	}, [checkUserSession]);

	return (
		<div>
			<Header></Header>
			<Switch>
				<Route exact path='/' component={HomePage}></Route>
				<Route path='/shop' component={ShopPage}></Route>
				<Route
					exact
					path='/sign-in'
					render={() =>
						currentUser ? <Redirect to='/' /> : <SignInSignUpPage />
					}
				></Route>
				<Route exact path='/checkout' component={CheckOut}></Route>
			</Switch>
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
	checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
