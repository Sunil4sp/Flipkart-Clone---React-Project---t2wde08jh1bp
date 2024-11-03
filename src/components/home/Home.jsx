import React, { useState } from 'react';
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
  console.log(isLoggedIn);

  const [openLogin, setOpenLogin] = useState(!isLoggedIn);
  
  const handleLogin = () =>{
    dispatch(setLoginStatus(true));
    setOpenLogin(false);
    console.log(setOpenLogin);
  }

  return (
    <>
    {!isLoggedIn && (
      <LoginDialog open={openLogin} setOpen={setOpenLogin} onLogin= {handleLogin}/>
    )} 

    {isLoggedIn && ( 
      <>
      <NavBar />
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