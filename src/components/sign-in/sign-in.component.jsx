import React, { Component } from 'react';
import FormInput from '../form-input/form-input.component.jsx';
import CustomButton from '../custom-button/custom-button.component.jsx';
import { signInWithGoogle, auth } from '../../firebase/firebase.utils.js';
import {
	SignInContainer,
	TitleContainer,
	ButtonsContainer,
} from './sign-in.styles.jsx';

class SignIn extends Component {
	constructor() {
		super();

		this.state = {
			email: '',
			password: '',
		};
	}

	handleChange = (event) => {
		const { name, value } = event.target;

		this.setState({ [name]: value });
	};

	handleSubmit = async (event) => {
		event.preventDefault();

		const { email, password } = this.state;

		try {
			await auth.signInWithEmailAndPassword(email, password);
			this.setState({ email: '', password: '' });
		} catch (error) {
			console.error(error);
		}
	};

	render() {
		return (
			<SignInContainer>
				<TitleContainer>Have an Account?</TitleContainer>
				<span>Sign in with your email and password</span>
				<form onSubmit={this.handleSubmit}>
					<FormInput
						name='email'
						type='email'
						value={this.state.email}
						handleChange={this.handleChange}
						label='Email'
						required
					></FormInput>
					<FormInput
						name='password'
						type='password'
						value={this.state.password}
						handleChange={this.handleChange}
						label='Password'
						required
					></FormInput>
					<ButtonsContainer>
						<CustomButton type='submit'>Sign In</CustomButton>
						<CustomButton onClick={signInWithGoogle} isGoogleSignIn>
							Sign In with Google
						</CustomButton>
					</ButtonsContainer>
				</form>
			</SignInContainer>
		);
	}
}

export default SignIn;
