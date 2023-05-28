// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	signOut,
	onAuthStateChanged,
} from 'firebase/auth';

import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
	collection,
	writeBatch,
	query,
	getDocs,
} from 'firebase/firestore';

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

export const addCollectionsAndDocuments = async (
	collectionKey,
	objectsToAdd
) => {
	const collectionRef = collection(db, collectionKey);
	const batch = writeBatch(db);

	objectsToAdd.forEach((object) => {
		const docRef = doc(collectionRef, object.title.toLowerCase());
		batch.set(docRef, object);
	});

	await batch.commit();
 
};

export const getCategoriesAndDocuments = async () => {
	const collectionRef = collection(db, 'categories');
	const q = query(collectionRef);

	const querySnapshot = await getDocs(q);

	const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
		const { title, items } = docSnapshot.data();
		acc[title.toLowerCase()] = items;
		return acc;
	}, {});

	return categoryMap;
};

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

export const signInWithAuthUserEmailAndPassword = async (email, password) => {
	if (!email || !password) return;

	return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => {
	return await signOut(auth);
};

export const onAuthStateChangedListener = (callback) => {
	onAuthStateChanged(auth, callback);
};
