import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormInput from '../form-input/form-input.component.jsx';
import CustomButton from '../custom-button/custom-button.component.jsx';
import {
	SignInContainer,
	TitleContainer,
	ButtonsContainer,
} from './sign-in.styles.jsx';
import {
	googleSignInStart,
	emailSignInStart,
} from '../../redux/user/user.actions.js';

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
		const { emailSignInStart } = this.props;

		emailSignInStart(email, password);
	};

	render() {
		const { googleSignInStart } = this.props;

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
						<CustomButton
							type='button'
							onClick={googleSignInStart}
							isGoogleSignIn
						>
							Sign In with Google
						</CustomButton>
					</ButtonsContainer>
				</form>
			</SignInContainer>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	googleSignInStart: () => dispatch(googleSignInStart()),
	emailSignInStart: (email, password) =>
		dispatch(emailSignInStart({ email, password })),
});

export default connect(null, mapDispatchToProps)(SignIn);
