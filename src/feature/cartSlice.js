import { createSlice } from "@reduxjs/toolkit";
import productData from "../data/allProductData";

//Getting cartdata form localstorage
const getLocalCartData = () => {
  /* if (
    localStorage.getItem("shoppingCart") === null ||
    localStorage.getItem("shoppingCart") === []
  ) {
    return [];
  }
  const localData = localStorage.getItem("shoppingCart");
  if (localData === []) return [];
  else return JSON.parse(localData); */

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
          /* console.log(price, quantity); */
          const itemTotal = Math.round(50 * price - 20) * quantity;
          /* console.log(itemTotal, price, quantity); */
          cartTotal.totalPrice += itemTotal;
          //console.log(cartTotal.totalPrice);
          cartTotal.totalQuantity += quantity;
          //console.log(cartTotal.totalQuantity);
          return cartTotal;
        },
        { totalPrice: 0, totalQuantity: 0 }
      );
      state.totalPrice = parseFloat(totalPrice.toFixed(2));
      state.totalQuantity = totalQuantity;
    },
    /* removeItem: (state, action) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload)
        }, */
    increaseItemQuantity: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    },
    /* decreaseItemQuantity: (state, action) => {
            state.cart = state.cart.map((item) => {
                if (item.id === action.payload) {
                    if (item.quantity > 0)
                        return { ...item, quantity: item.quantity - 1 };
                    else
                        return state.cart = state.cart.filter((item) => item.id !== action.payload)        
                }
                return item;
            })
        } */
    decreaseItemQuantity: (state, action) => {
      state.cart = state.cart.reduce((newCart, item) => {
        if (item.id === action.payload) {
          if (item.quantity > 1) {
            newCart.push({ ...item, quantity: item.quantity - 1 });
          }
          // No else case needed, as `item` should be filtered out if quantity <= 0
        } else {
          newCart.push(item);
        }
        return newCart;
      }, []);
    },
  },
});

export const {
  addToCart,
  getCartTotal,
  /* removeItem, */
  increaseItemQuantity,
  decreaseItemQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
