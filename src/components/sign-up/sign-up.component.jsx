import React, { Component } from 'react';
import {
	auth,
	createUserProfileDocument,
} from '../../firebase/firebase.utils.js';
import './sign-up.styles 2.scss';
import FormInput from '../form-input/form-input.component.jsx';
import CustomButton from '../custom-button/custom-button.component.jsx';

class SignUp extends Component {
	constructor() {
		super();

		this.state = {
			displayName: '',
			email: '',
			password: '',
			confirmPassword: '',
		};
	}

	handleChange = (event) => {
		const { name, value } = event.target;

		this.setState({ [name]: value });
	};

	handleSubmit = async (event) => {
		event.preventDefault();

		const { displayName, email, password, confirmPassword } = this.state;

		if (password !== confirmPassword) {
			alert(`Passwords don't match`);

			return;
		}

		try {
			const { user } = await auth.createUserWithEmailAndPassword(
				email,
				password
			);

			await createUserProfileDocument(user, { displayName });

			this.setState({
				displayName: '',
				email: '',
				password: '',
				confirmPassword: '',
			});
		} catch (error) {
			console.error(error);
		}
	};

	render() {
		return (
			<div className='sign-up'>
				<h2 className='title'>Don't an Account?</h2>
				<span>Sign up with your email and password</span>
				<form onSubmit={this.handleSubmit}>
					<FormInput
						name='displayName'
						type='text'
						value={this.state.displayName}
						handleChange={this.handleChange}
						label='Username'
						required
					></FormInput>
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
					<FormInput
						name='confirmPassword'
						type='password'
						value={this.state.confirmPassword}
						handleChange={this.handleChange}
						label='Confirm Password'
						required
					></FormInput>
					<div className='button'>
						<CustomButton type='submit'>Sign Up</CustomButton>
					</div>
				</form>
			</div>
		);
	}
}

export default SignUp;
