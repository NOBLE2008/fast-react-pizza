import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart(state, action) {
      state.cart.push(action.payload);
    },
    incrementCart(state, action) {
      state.cart = state.cart.map((item) => {
        if (item.pizzaId === action.payload) {
          return {
            ...item,
            quantity: item.quantity + 1,
            totalPrice: item.totalPrice + Number(item.unitPrice),
          };
        } else {
          console.log('done');
          return item;
        }
      });
    },
    decrementCart(state, action) {
      const index = state.cart.findIndex(
        (item) => item.pizzaId === action.payload,
      );
      if (state.cart[index].quantity <= 1) {
        state.cart = state.cart.filter((item) => {
          return action.payload !== item.pizzaId;
        });
      }
      state.cart = state.cart.map((item) => {
        if (item.pizzaId === action.payload) {
          if (item.quantity > 1) {
            return {
              ...item,
              quantity: item.quantity - 1,
              totalPrice: item.totalPrice - Number(item.unitPrice),
            };
          }
        } else {
          return item;
        }
      });
    },
    removeItem(state, action) {
      state.cart = state.cart.filter((item) => {
        return action.payload !== item.pizzaId;
      });
    },
    clearCart(state, action) {
      state.cart = [];
    },
  },
});

export const {
  addToCart,
  incrementCart,
  decrementCart,
  removeItem,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
