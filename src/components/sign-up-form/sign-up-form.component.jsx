import { useState } from 'react';

const SignUpForm = () => {

	const defaultFormFields = {
		displayName: '',
		email: '',
		password: '',
		confirmPassword: '',
	};

	const [formFields, setFormFields] = useState(defaultFormFields);
	const { displayName, email, password, confirmPassword } = formFields;

	const changeHandler = (event) => {
		const { name, value } = event.target;

		setFormFields((prevState) => {
			return {...prevState, [name]: value};
		});
	};

	const submitHandler = (event) => {
		event.preventDefault();

		console.log(formFields);
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
