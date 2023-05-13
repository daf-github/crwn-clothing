
import { getDoc } from "firebase/firestore";
import { signInWithGooglePopUp, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
 



const SignIn = () => {

	const logGoggleUser = async () => {

		const { user } = await signInWithGooglePopUp();
	 

		const result = createUserDocumentFromAuth(user);

		console.log(result);

	 




		
	}


	return (
		<div>
			<h1>Sign In</h1>
			<button onClick={logGoggleUser}>
				Sign In with Google PopUp
			</button>
		</div>
	);
};

export default SignIn;
