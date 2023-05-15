// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

export const getFirebaseApp = () => {
	// TODO: Add SDKs for Firebase products that you want to use
	// https://firebase.google.com/docs/web/setup#available-libraries

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
	return initializeApp(firebaseConfig);
};
