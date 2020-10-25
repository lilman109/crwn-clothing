import CartActionTypes from './cart.types.js';
import { addItemToCart } from './cart.utils.js';

const INITIAL_STATE = {
	hidden: true,
	cartItems: [],
	totalItems: 0,
};

const CartReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case CartActionTypes.TOGGLE_CART_HIDDEN:
			return {
				...state,
				hidden: !state.hidden,
			};

		case CartActionTypes.ADD_ITEM:
			return {
				...state,
				cartItems: addItemToCart(state.cartItems, action.payload),
				totalItems: state.totalItems + 1,
			};

		default:
			return state;
	}
};

export default CartReducer;
