import React, { useState } from 'react';
import './sign-up.styles 2.scss';
import FormInput from '../form-input/form-input.component.jsx';
import CustomButton from '../custom-button/custom-button.component.jsx';
import { signUpStart } from '../../redux/user/user.actions.js';
import { connect } from 'react-redux';

const SignUp = ({ signUpStart }) => {
	const [userCredentials, setUserCredentials] = useState({
		displayName: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const { displayName, email, password, confirmPassword } = userCredentials;

	const handleChange = (event) => {
		const { name, value } = event.target;

		setUserCredentials({ ...userCredentials, [name]: value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (password !== confirmPassword) {
			alert(`Passwords don't match`);

			return;
		}

		signUpStart({ displayName, email, password });
	};

	return (
		<div className='sign-up'>
			<h2 className='title'>Don't have an Account?</h2>
			<span>Sign up with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					name='displayName'
					type='text'
					value={displayName}
					handleChange={handleChange}
					label='Username'
					required
				></FormInput>
				<FormInput
					name='email'
					type='email'
					value={email}
					handleChange={handleChange}
					label='Email'
					required
				></FormInput>
				<FormInput
					name='password'
					type='password'
					value={password}
					handleChange={handleChange}
					label='Password'
					required
				></FormInput>
				<FormInput
					name='confirmPassword'
					type='password'
					value={confirmPassword}
					handleChange={handleChange}
					label='Confirm Password'
					required
				></FormInput>
				<div className='button'>
					<CustomButton type='submit'>Sign Up</CustomButton>
				</div>
			</form>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => ({
	signUpStart: (userCredentials) => dispatch(signUpStart(userCredentials)),
});

export default connect(null, mapDispatchToProps)(SignUp);
