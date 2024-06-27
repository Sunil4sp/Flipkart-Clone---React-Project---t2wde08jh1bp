import { createSlice } from "@reduxjs/toolkit";
import productData from "../data/allProductData";

//Getting cartdata form localstorage
const getLocalCartData = () => {
    if (localStorage.getItem("shoppingCart") === null || localStorage.getItem("shoppingCart") === []) {
        return [];
    }
    const localData = localStorage.getItem("shoppingCart");
    if (localData === [])
        return [];
    else
        return JSON.parse(localData);
}

const initialState = {
    cart: getLocalCartData(),
    item: productData,
    totalQuantity: 0,
    totalPrice: 0,
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const find = state.cart.findIndex((item) => item.id === action.payload.id);
            if (find <= 0)
                state.cart[find].totalQuantity += 1;
            else
                state.cart.push(action.payload);
        },
        getCartTotal: (state) => {
            let { totalQuantity, totalPrice } = state.cart.reduce(
                (cartTotal, cartItem) => {
                    const { price, quantity } = cartItem;
                    const itemTotal = price * quantity; 
                    console.log(itemTotal, price, quantity);
                    cartTotal.totalPrice += itemTotal;
                    console.log(cartTotal.totalPrice);
                    cartTotal.totalQuantity += cartItem.quantity;
                    console.log(cartTotal.totalQuantity);
                    return cartTotal;
                },
                {
                    totalPrice: 0,
                    totalQuantity: 0,
                    quantity: 1,
                }
            );
            state.totalPrice = parseInt(totalPrice.toFixed(2));
            state.totalQuantity = totalQuantity;
        },
        removeItem: (state, action) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload)
        },
        increaseItemQuantity: (state, action) => {
            state.cart = state.cart.map((item) => {
                if (item.id === action.payload) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            })
        },
        decreaseItemQuantity: (state, action) => {
            state.cart = state.cart.map((item) => {
                if (item.id === action.payload) {
                    if (item.quantity > 1)
                        return { ...item, quantity: item.quantity - 1 };
                }
                return item;
            })
        },

    },
})

export const { addToCart, getCartTotal, removeItem, increaseItemQuantity, decreaseItemQuantity
} = cartSlice.actions;
export default cartSlice.reducer;
