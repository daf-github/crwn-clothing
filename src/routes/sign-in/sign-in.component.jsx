import { getDoc } from 'firebase/firestore';
import {
	auth,
	signInWithGooglePopUp,
	signInWithGoggleRedirect,
	createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';



import { useEffect } from 'react';
import { getRedirectResult} from 'firebase/auth';

const SignIn = () => {


	useEffect( () => {

		const createUser = async () => {

			console.log("auth", auth);
			const response = await getRedirectResult(auth);
			
			if (response !== null) {
				console.log(response);
			}

		}

		createUser();
		



	},[]);



	const logGoggleUserPopUp = async () => {
		const { user } = await signInWithGooglePopUp();
		const userDocRef = createUserDocumentFromAuth(user);
	};


	const logGoggleUserRedirect = async () => {
		const { user } = await signInWithGoggleRedirect();
		 
	 
	};

	return (
		<div>
			<h1>Sign In</h1>
			<button onClick={logGoggleUserPopUp}>Sign In with Google PopUp</button>
			<button onClick={logGoggleUserRedirect}>Sign In with Google Redirect</button>
		</div>
	);
};

export default SignIn;
