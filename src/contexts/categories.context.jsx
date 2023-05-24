import { createContext, useEffect, useState } from 'react';

// only to load data initially into the firebase database.
// import SHOP_DATA from '../shop-data.js';
// import { addCollectionsAndDocuments } from '../utils/firebase/firebase.utils.js'; 


import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';

export const CategoriesContext = createContext({
	categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
	const [categoriesMap, setCategoriesMap] = useState({});

	// only runs once..
	// useEffect( () => {
	// 	addCollectionsAndDocuments('categories', SHOP_DATA);

	// }, []);

	useEffect(() => {

		const getCategoriesMap = async () => {
			const categoriesMap = await getCategoriesAndDocuments();
			setCategoriesMap(categoriesMap);
		}

		getCategoriesMap();

		 
		

	}, [])




	const value = {
		categoriesMap,
	};

	return (
		<CategoriesContext.Provider value={value}>
			{children}
		</CategoriesContext.Provider>
	);
};
