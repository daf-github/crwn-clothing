import { useState } from 'react';
import { getFirebaseApp } from '../../utils/firebase/firebase.helper';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import './sign-up-form.styles.scss';
import Button from '../button/button-component';

const SignUpForm = () => {
	const defaultFormFields = {
		displayName: '',
		email: '',
		password: '',
		confirmPassword: '',
	};

	const [formFields, setFormFields] = useState(defaultFormFields);
	const { displayName, email, password, confirmPassword } = formFields;

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	const changeHandler = (event) => {
		const { name, value } = event.target;

		setFormFields((prevState) => {
			return { ...prevState, [name]: value };
		});
	};

	const submitHandler = async (event) => {
		event.preventDefault();

		const firebaseApp = getFirebaseApp();
		const auth = getAuth(firebaseApp);

		if (password !== confirmPassword) {
			alert('passwords do not match');
			return;
		}

		try {
			const { user } = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);

			await createUserDocumentFromAuth(user, { displayName });

			resetFormFields();
		} catch (error) {
			if (error.code === 'auth/email-already-in-use') {
				alert('Cannot create user, email already in use');
			} else if (error.code === 'auth/weak-password') {
				alert('Password should be at least 6 character');
			} else {
				console.log('user creation encountered an error', error);
			}
		}
	};

	return (
		<div className='sign-up-container'>
			<h2>Don't have an account?</h2>
			<span>Sign up with email and password</span>

			<form onSubmit={submitHandler}>
				<FormInput
					label='Display Name'
					type='text'
					required={true}
					onChange={changeHandler}
					value={displayName}
					name='displayName'
				/>

				<FormInput
					label='Email'
					type='email'
					required={true}
					onChange={changeHandler}
					value={email}
					name='email'
				/>

				<FormInput
					label='Password'
					type='password'
					required={true}
					onChange={changeHandler}
					value={password}
					name='password'
				/>

				<FormInput
					label='Confirm Password'
					type='password'
					required={true}
					onChange={changeHandler}
					value={confirmPassword}
					name='confirmPassword'
				/>
 

				<Button 
					type='submit'
					buttonType='inverted'
				>Sing up</Button>
			</form>
		</div>
	);
};

export default SignUpForm;
