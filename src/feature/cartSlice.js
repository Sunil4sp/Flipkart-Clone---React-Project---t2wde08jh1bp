import { createSlice } from "@reduxjs/toolkit";
import productData from "../data/allProductData";

//Getting cartdata form localstorage
const getLocalCartData = () => {

  const localData = localStorage.getItem("shoppingCart");
  if (!localData) return [];
  try {
    const parsedData = JSON.parse(localData);
    return Array.isArray(parsedData) ? parsedData : [];
  } catch {
    return [];
  }
};

const initialState = {
  cart: getLocalCartData(),
  item: productData,
  totalQuantity: 0,
  totalPrice: 0,
  isLoggedIn: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const find = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      if (find === -1) 
        state.cart.push({ ...action.payload, quantity: 1});
      else 
        state.cart[find].quantity += 1;
    },
    getCartTotal: (state) => {
      const { totalQuantity, totalPrice } = state.cart.reduce(
        (cartTotal, cartItem) => {
          const { price, quantity } = cartItem;
          const itemTotal = Math.round(50 * price - 20) * quantity;
          cartTotal.totalPrice += itemTotal;
          cartTotal.totalQuantity += quantity;
          return cartTotal;
        },
        { totalPrice: 0, totalQuantity: 0 }
      );
      state.totalPrice = parseFloat(totalPrice.toFixed(2));
      state.totalQuantity = totalQuantity;
    },
    
    increaseItemQuantity: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    },
    
    decreaseItemQuantity: (state, action) => {
      state.cart = state.cart.reduce((newCart, item) => {
        if (item.id === action.payload) {
          if (item.quantity > 1) {
            newCart.push({ ...item, quantity: item.quantity - 1 });
          }
        } else {
          newCart.push(item);
        }
        return newCart;
      }, []);
    },
    setLoginStatus: (state, action) => {
      state.isLoggedIn = action.payload; // Set the login status
    },
    clearCart: (state) => {
      state.cart = []; // Clear the cart
    },
  },
});

export const {
  addToCart,
  getCartTotal,
  increaseItemQuantity,
  decreaseItemQuantity,
  setLoginStatus,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
