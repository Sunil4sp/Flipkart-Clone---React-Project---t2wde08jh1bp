import { createSlice } from "@reduxjs/toolkit";

// Getting cart data from localStorage
const getLocalOrdersData = () => {
  const localData = localStorage.getItem("orders");
  if (!localData) return [];
  try {
    const parsedData = JSON.parse(localData);
    return Array.isArray(parsedData) ? parsedData : [];
  } catch {
    return [];
  }
};

// Initial state for orders slice
const initialState = {
  orders: getLocalOrdersData(), // Retrieve any previous orders from localStorage
  orderCount: 0,
  orderHistory: [],
};

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    placeOrder: (state, action) => {
      // The action payload should contain cart data for the order
      const newOrder = {
        orderId: Date.now(),  // Using timestamp as a unique order ID
        items: action.payload.cart,  // The cart items are stored as part of the order
        totalPrice: action.payload.totalPrice,
        totalQuantity: action.payload.totalQuantity,
        orderDate: new Date().toLocaleString(), // Store the date when the order was placed
      };

      // Save the new order to the state and localStorage
      state.orders.push(newOrder);
      localStorage.setItem("orders", JSON.stringify(state.orders));
      state.orderCount += 1;
    },

    getOrderHistory: (state) => {
      // Selector for retrieving all placed orders
      return state.orders;
    },

    clearOrders: (state) => {
      // Optionally clear all orders
      state.orders = [];
      localStorage.removeItem("orders"); // Clear the orders from localStorage
    },

    clearOrderById: (state, action) => {
      // Remove a specific order by ID
      state.orders = state.orders.filter(order => order.orderId !== action.payload);
      localStorage.setItem("orders", JSON.stringify(state.orders));
    },
  },
});

export const { placeOrder, getOrderHistory, clearOrders, clearOrderById } = orderSlice.actions;

export default orderSlice.reducer;
