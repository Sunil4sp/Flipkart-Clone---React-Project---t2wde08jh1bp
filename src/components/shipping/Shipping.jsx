import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../feature/cartSlice"; 
import { useDispatch } from "react-redux";

const Shipping = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=>{
    const timeOut = setTimeout(() => {
    navigate('/');
  }, 1500);

  dispatch(clearCart());

  return () => clearTimeout(timeOut);
  }, [dispatch, navigate]);

  return(
    <div style={{margin: '280px 400px', padding: '30px'}}> Congratulations ! your order has been placed successfully.
    </div>
  )
};

export default Shipping;
