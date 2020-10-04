import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component.jsx';

const HatsPage = () => (
	<div>
		<h1> HATS PAGE</h1>
	</div>
);

function App() {
	return (
		<div>
			<Switch>
				<Route exact path="/" component={HomePage}></Route>
				<Route exact path="/shop/hats" component={HatsPage}></Route>
			</Switch>
		</div>
	);
}

export default App;
