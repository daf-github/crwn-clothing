import {
	signInWithGooglePopUp,
	createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

const SignIn = () => {
	const logGoggleUserPopUp = async () => {
		const { user } = await signInWithGooglePopUp();
		const userDocRef = createUserDocumentFromAuth(user);
	};

	return (
		<div>
			<h1>Sign In</h1>
			<button onClick={logGoggleUserPopUp}>Sign In with Google PopUp</button>
			<SignUpForm />
		</div>
	);
};

export default SignIn;
