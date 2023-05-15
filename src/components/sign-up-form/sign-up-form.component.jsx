
import { useState } from 'react';
import { getFirebaseApp } from '../../utils/firebase/firebase.helper'; 
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'; 



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
	}

	const changeHandler = (event) => {
		const { name, value } = event.target;
		

		setFormFields((prevState) => {
			return {...prevState, [name]: value};
		});
	};

	const submitHandler = async (event) => {
		event.preventDefault();

		const firebaseApp = getFirebaseApp();
		const auth = getAuth(firebaseApp);

		if (password !== confirmPassword) {
			alert("passwords do not match");
			return;
		
		
		}

		 
		 

		try {

			const { user } = await createUserWithEmailAndPassword(auth, email, password);

			await createUserDocumentFromAuth(user, { displayName});

			resetFormFields();


			
		} catch (error) {
			if (error.code === 'auth/email-already-in-use') {
				alert('Cannot create user, email already in use');
			} else {
				console.log('user creation encountered an error', error);	
			}
			
			
			
		}

		 






	};

	return (
		<div>
			<h1>Sign up with email and password</h1>

			<form onSubmit={submitHandler}>
				<label>Display Name</label>
				<input
					type='text'
					required={true}
					onChange={changeHandler}
					value={displayName}
					name='displayName'
				></input>

				<label>Email</label>
				<input
					type='email'
					required={true}
					onChange={changeHandler}
					value={email}
					name='email'
				></input>

				<label>Password</label>
				<input
					type='password'
					required={true}
					onChange={changeHandler}
					value={password}
					name='password'
				></input>

				<label>Confirm Password</label>
				<input
					type='password'
					required={true}
					onChange={changeHandler}
					value={confirmPassword}
					name='confirmPassword'
				></input>

				<button type='submit'>Sing in</button>

			 

			</form>
		</div>
	);
};

export default SignUpForm;
