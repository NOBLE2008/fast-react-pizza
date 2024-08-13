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
      console.log(action.payload)
     state.cart =  state.cart.map((item) => {
        if (item.pizzaId === action.payload) {
          return {
            ...item,
            quantity: item.quantity + 1,
            totalPrice: item.totalPrice + Number(item.unitPrice),
          };
        }else{
          console.log('done')
          return item;
        }
      });
    },
    decrementCart(state, action) {
      const item = state.cart.find((c) => c.pizzaId === action.payload);
      const index = state.cart.findIndex((c) => c.pizzaId === action.payload);
      if (item.id === action.payload) {
        if (item.quantity > 1) {
          item.totalPrice = item.totalPrice - Number(item.unitPrice);
          item.quantity -= 1;
        } else {
          state.cart = state.cart.filter((item) => {
            return action.payload !== item.id;
          });
        }
      }
      state.cart[index] = item;
    },
    removeItem(state, action) {
      state.cart = state.cart.filter((item) => {
        return action.payload !== item.id;
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
