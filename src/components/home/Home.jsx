import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
/* import { store } from '../../app/store';*/
import { setLoginStatus } from "../../feature/userSlice"; 
import NavBar from './NavBar';
import Banner from './Banner';
import Slide from './Slide';
import LoginDialog from '../login/LoginDialog';
import { Box, styled } from '@mui/material';
import MidSlides from './MidSlides';

const Component = styled(Box)({
  padding: '10px',
  background: '#F2F2F2'
})

const Home = () => { 

  const dispatch = useDispatch();
  const {isLoggedIn} = useSelector((state) => state.user);
  /* console.log(isLoggedIn); */

  useEffect(() => {
    const storedLoginStatus = JSON.parse(localStorage.getItem('isLoggedIn'));
    if (storedLoginStatus) {
      dispatch(setLoginStatus(true)); // Update the Redux state if logged in
    }
  }, [dispatch]);

  const [openLogin, setOpenLogin] = useState(!isLoggedIn);
  
  const handleLogin = () =>{
    dispatch(setLoginStatus(true));
    setOpenLogin(false);
    console.log(setOpenLogin);
    localStorage.setItem('isLoggedIn', JSON.stringify(true));
  };

  const handleLogout = () => {
    dispatch(setLoginStatus(false));
    localStorage.removeItem('isLoggedIn'); // Remove login status from localStorage
  };

  return (
    <>
    {!isLoggedIn && (
      <LoginDialog open={openLogin} setOpen={setOpenLogin} onLogin= {handleLogin}/>
    )} 

    {isLoggedIn && ( 
      <>
      <NavBar onLogout={handleLogout} />
      <Component>
        <Banner />
        <MidSlides title="Best of Smartphones" timer={false} autoPlay={false} filterText= {"smartphones"}/>
        <Slide title="Top Deals on Laptops" timer={false} autoPlay={false} filterText = {"laptops"} />
        <Slide title="Season's Top Pick" timer={false} autoPlay={false}  />
      </Component>
      </> 
      )}
    </>
    
  )
}

export default Home;