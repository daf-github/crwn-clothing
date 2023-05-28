import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// import './cart-dropdown.styles.scss';
 
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

// import { BaseButton, GoogleSignInButton, InvertedButton} from '../button/button.styles'


import { CartContext } from '../../contexts/cart.context';
import CartItem from '../cart-item/cart-item.component';
import {
	CartDropdownContainer,
	CartItems,
	EmptyMessage,
} from './cart-dropdown.styles ';

const CartDropdown = () => {
	const { cartItems } = useContext(CartContext);

	const navigate = useNavigate();

	const goToCheckoutHandler = () => {
		navigate('/checkout');
	};

	return (
		<CartDropdownContainer>
			{cartItems.length > 0 ? (
				<CartItems>
					{cartItems.map((cartItem) => (
						<CartItem key={cartItem.id} cartItem={cartItem} />
					))}
				</CartItems>
			) : (
				<EmptyMessage>The cart is empty</EmptyMessage>
			)}

			<Button
				buttonType={BUTTON_TYPE_CLASSES.inverted}
				onClick={goToCheckoutHandler}
			>
				GO TO CHECKOUT
			</Button>
		</CartDropdownContainer>
	);
};

export default CartDropdown;
