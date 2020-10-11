import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component.jsx';
import ShopPage from './pages/shop/shop.component.jsx';
import SignInSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx';
import Header from './components/header/header.component.jsx';
import { auth } from './firebase/firebase.utils.js';

class App extends Component {
	constructor() {
		super();

		this.state = {
			currentUser: null,
		};
	}

	unsubscribeFromAuth = null;

	componentDidMount() {
		this.unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
			this.setState({ currentUser: user });
		});

		console.log('component did mount');
	}

	componentWillUnmount() {
		this.unsubscribeFromAuth();
		console.log('component will unmount');
	}

	render() {
		return (
			<div>
				<Header currentUser={this.state.currentUser}></Header>
				<Switch>
					<Route exact path="/" component={HomePage}></Route>
					<Route exact path="/shop" component={ShopPage}></Route>
					<Route exact path="/sign-in" component={SignInSignUpPage}></Route>
				</Switch>
			</div>
		);
	}
}

export default App;
