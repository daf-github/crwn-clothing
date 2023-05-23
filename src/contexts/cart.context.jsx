import { createContext, useEffect, useState } from 'react';

export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	cartItems: [],
	addItemToCart: () => {},
	removeItemFromCart: () => {},
	clearItemFromCart: () => {},
	cartCount: 0,
	cartTotal: 0,
});

export const CartProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [cartCount, setCartCount] = useState(0);
	const [cartTotal, setCartTotal] = useState(0);

	const removeCartItem = (productToRemove, cartItems) => {
		const existingItem = cartItems.find(
			(cartItem) => cartItem.id === productToRemove.id
		);

		if (existingItem.quantity === 1) {
			return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
		}

		if (existingItem) {
			return cartItems.map((cartItem) =>
				cartItem.id === productToRemove.id
					? { ...cartItem, quantity: cartItem.quantity - 1 }
					: cartItem
			);
		}
	};

	const addCartItem = (productToAdd, cartItems) => {
		const existingItem = cartItems.find(
			(cartItem) => cartItem.id === productToAdd.id
		);

		if (existingItem) {
			return cartItems.map((cartItem) =>
				cartItem.id === productToAdd.id
					? { ...cartItem, quantity: cartItem.quantity + 1 }
					: cartItem
			);
		}

		return [...cartItems, { ...productToAdd, quantity: 1 }];
	};

	const clearCartItem = (cartItemToClear, cartItems) => {
		return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
	};

	const removeItemFromCart = (productToRemove) => {
		setCartItems(removeCartItem(productToRemove, cartItems));
	};

	const clearItemFromCart = (cartItemToClear) => {
		setCartItems(clearCartItem(cartItemToClear, cartItems));
	};

	const addItemToCart = (productToAdd) => {
		setCartItems(addCartItem(productToAdd, cartItems));
	};

	useEffect(() => {
		const total = cartItems.reduce(
			(accumulator, object) => accumulator + object.quantity,
			0
		);

		setCartCount(total);
	}, [cartItems]);

	useEffect(() => {
		const total = cartItems.reduce(
			(accumulator, object) => accumulator + object.quantity * object.price,
			0
		);

		setCartTotal(total);
	}, [cartItems]);




	const value = {
		isCartOpen,
		setIsCartOpen,
		cartItems,
		addItemToCart,
		removeItemFromCart,
		clearItemFromCart,
		cartCount,
		cartTotal,
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
