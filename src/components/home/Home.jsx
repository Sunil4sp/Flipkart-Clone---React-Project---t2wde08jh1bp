import React, { useState } from 'react';
import { useSelector } from "react-redux";
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

  const [openLogin, setOpenLogin] = useState(true);
  const { isLoggedIn } = useSelector((state) => state.user); 
  return (
    <>
    {!isLoggedIn ? (<LoginDialog open={openLogin} setOpen={setOpenLogin}/>) :
    ( 
    <><NavBar />
      <Component>
        <Banner />
        <MidSlides title="Best of Smartphones" timer={false} autoPlay={false} filterText= {"smartphones"}/>
        <Slide title="Top Deals on Laptops" timer={false} autoPlay={false} filterText = {"laptops"} />
        <Slide title="Season's Top Pick" timer={false} autoPlay={false}  />
      </Component>
      </> )}
    </>
    
  )
}

export default Home;