import { Box, Typography, Button, Grid, styled } from "@mui/material";
import React, { useState, useEffect } from "react";
import { setLoginStatus } from "../../feature/userSlice";
import { getCartTotal } from "../../feature/cartSlice"; 
import { placeOrder } from "../../feature/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";
import TotalView from "./TotalView";
import LoginDialog from "../login/LoginDialog";

const Component = styled(Grid)(({ theme }) => ({
  padding: "30px 135px",
  display: "flex",
  [theme.breakpoints.down("md")]: {
    padding: "15px 0",
  },
}));

const LeftComponent = styled(Grid)(({ theme }) => ({
  paddingRight: 15,
  [theme.breakpoints.down("sm")]: {
    marginBottom: 15,
  },
}));

const Header = styled(Box)`
  padding: 15px 24px;
  background: #fff;
`;

const BottomWrapper = styled(Box)`
  padding: 16px 22px;
  background: #fff;
  box-shadow: 0 -2px 10px 0 rgb(0 0 0 / 10%);
  border-top: 1px solid #f0f0f0;
`;

const StyledButton = styled(Button)`
  display: flex;
  margin-left: auto;
  background: #fb641b;
  color: #fff;
  border-radius: 2px;
  width: 250px;
  height: 51px;
`;

const Cart = () => {
  const { cart, totalPrice, totalQuantity } = useSelector((state) => state.cart);
  const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false); 

  useEffect(() => {
   if (cart.length > 0) {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
   }
  }, [cart]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('shoppingCart'));
    if (storedCart) {
      // Dispatch to set the cart state from localStorage
      dispatch({ type: 'cart/setCart', payload: storedCart });
    }
    // Recalculate cart totals
    dispatch(getCartTotal());
  }, [dispatch]);

  const handleLogin = () =>{
    dispatch(setLoginStatus(true));
    setOpen(false);
  }
  
  const handlePlaceOrder = () => {
    if (isLoggedIn ) {
      // Create a new order with cart data
      const newOrder = {
        orderId: Date.now(), // Unique order ID
        items: cart, // Cart items
        date: new Date().toLocaleString(), // Order date
        status: "Shipped", // Set the order status to Shipped
      };
      /* console.log(isLoggedIn); */
      dispatch(placeOrder(newOrder));

      const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
      storedOrders.push(newOrder);
      localStorage.setItem("orders", JSON.stringify(storedOrders));
      
      const timeOut = setTimeout(()=>{
        navigate('/shipping');
      },1000);
      
      return () => clearTimeout(timeOut);
    } else {
      setOpen(true);
    }
  };

  return (
    <>
      {cart.length > 0 ? (
        <Component container>
          <LeftComponent item lg={9} md={9} sm={12} xs={12}>
            <Header>
              <Typography style={{ fontWeight: 600, fontSize: 18 }}>
                Total Cart {totalQuantity} items
              </Typography>
            </Header>
            <div>
              {cart.map((item, index) => (
                <CartItem
                  key={index}
                  item={item}
                  totalPrice={totalPrice}
                  totalQuantity={totalQuantity}
                  quantity={item.quantity}
                  price={item.price}
                />
              ))}
            </div>
            <BottomWrapper>
              {isLoggedIn ? (
              <StyledButton onClick={handlePlaceOrder} variant="contained">
                Place Order
              </StyledButton>
              ) :(
              <Typography variant="body2" color="error">
                {alert("Please log in to place an order.")}
                <LoginDialog open={open} setOpen={setOpen} onLogin= {handleLogin}/>
              </Typography>
            )}
            </BottomWrapper>
          </LeftComponent>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <TotalView
              cart={cart}
              totalPrice={totalPrice}
              totalQuantity={totalQuantity}
            />
          </Grid>
        </Component>
      ) : (
        <>
          <EmptyCart />
        </>
      )}
    </>
  );
};
export default Cart;
