// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	signInWithEmailAndPassword,
	GoogleAuthProvider,
} from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCAEJJSmSRQoOGbUEyYV1rlfcKaN_ZIdpc',
	authDomain: 'crwn-clothing-fb7b2.firebaseapp.com',
	projectId: 'crwn-clothing-fb7b2',
	storageBucket: 'crwn-clothing-fb7b2.appspot.com',
	messagingSenderId: '578501736084',
	appId: '1:578501736084:web:0ea6a780c89f0d8f38e681',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
	prompt: 'select_account',
});

export const auth = getAuth(firebaseApp);
export const signInWithGooglePopUp = () =>
	signInWithPopup(auth, googleProvider);
export const signInWithGoggleRedirect = () =>
	signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
	userAuth,
	additionalInformation = {}
) => {
	if (!userAuth) return;

	const userDocRef = doc(db, 'users', userAuth.uid);

	const userSnapShot = getDoc(userDocRef);

	if (!(await userSnapShot).exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				...additionalInformation,
			});
		} catch (error) {
			console.log('error creating the user', error);
		}
	}

	return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;

	return await signInWithEmailAndPassword(auth, email, password);
};
