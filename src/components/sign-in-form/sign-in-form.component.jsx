import { useState, useContext } from 'react';
import { createUserDocumentFromAuth, signInWithAuthUserEmailAndPassword, signInWithGooglePopUp } from '../../utils/firebase/firebase.utils';
import { UserContext } from '../../contexts/user.context';

import FormInput from '../form-input/form-input.component';
import './sign-in-form.styles.scss';
import Button from '../button/button-component';

const defaultFormFields = {
	email: '',
	password: '',
};

const SignInForm = () => {

	const { setCurrentUser } = useContext(UserContext);	

	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	const changeHandler = (event) => {
		const { name, value } = event.target;

		setFormFields((prevState) => {
			return { ...prevState, [name]: value };
		});
	};

	const signInWithGoogle = async () => {
		const { user } = await signInWithGooglePopUp();
		setCurrentUser(user);
		await createUserDocumentFromAuth(user);

	};

	const submitHandler = async (event) => {
		event.preventDefault();

		 

		try {
			 

			const { user} = await signInWithAuthUserEmailAndPassword(email, password);
			setCurrentUser(user);		
			resetFormFields();
		} catch (error) {

			switch (error.code) {
				case 'auth/wrong-password':
					alert('incorrect password for email');					
					break;			
				case 'auth/user-not-found':
					alert('no user associated with this email');					
				break;			
				default:
					console.log(error);
			}

			 
		}
	};

	return (
		<div className='sign-up-container'>
			<h2>I already have an account?</h2>
			<span>Sign in with email and password</span>

			<form onSubmit={submitHandler}>
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

				<div className='buttons-container'>
					<Button type='submit' buttonType='inverted'>
						Sing in
					</Button>

					<Button type='button' onClick={signInWithGoogle} buttonType='google'>
						Google Sign In
					</Button>
				</div>
			</form>
		</div>
	);
};

export default SignInForm;
