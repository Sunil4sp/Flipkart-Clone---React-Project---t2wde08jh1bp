import React, { useEffect, useState } from 'react'
import { Box, Typography, Badge, Button, styled } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import '../../App.css';
import LoginDialog from '../login/LoginDialog';
import { useDispatch, useSelector } from 'react-redux';
import { getCartTotal } from '../../feature/cartSlice';
import ProfileManager from '../home/ProfileManager';

const Container = styled(Link)(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.down('sm')]: {
    display: 'block'
  }
}));

const Wrapper = styled(Box)(({ theme }) => ({
  margin: '0 3% 0 auto',
  display: 'flex',
  '& > *': {
    marginRight: '40px !important',
    textDecoration: 'none',
    color: '#FFFFFF',
    fontSize: 12,
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      color: '#2874f0',
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      marginTop: 10
    }
  },
  [theme.breakpoints.down('sm')]: {
    display: 'block'
  }
}));

const LoginButton = styled(Button)`
  color: green;
  background: #FFFFFF;
  text-transform: none;
  font-weight: 600;
  border-radius: 1;
  padding: 5px 40px;
  height: 32;
  box-shadow: none;
  margin-left:20px;

  &:hover {
    color: #FFFFFF; /* Change text color on hover */
    background: green; /* Change background color on hover */
  }
`
//=========================================function starts===========================
const CustomButton = () => {
  
  //==================localStrorage
  const [accountPresent, setAccountPresent] = useState(false);
  const localUserName = localStorage.getItem('signup');
  
  const [open, setOpen] = useState(false);

  const openDialog = () => {
    setOpen(true);
  }

  const { cart, totalQuantity } = useSelector((state) => state.allCart);

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getCartTotal());
    if (localStorage.getItem("signup") !== null) {
      setAccountPresent(true);
    }
  }, [dispatch, cart]);



  return (
    <Wrapper>
      {
        accountPresent ? <ProfileManager localUserName={localUserName} accountPresent={accountPresent} setAccountPresent={setAccountPresent} /> :
        <LoginButton variant='contained' onClick={openDialog}>Login</LoginButton>
      }
      <Typography style={{ marginTop: 3, width: 135, cursor:'pointer' }}>
        <Link to="/profile" className='profile'>Profile</Link></Typography>
      <Typography style={{ marginTop: 3, cursor: 'pointer' }}>More</Typography>

      <Container to='/cart'>
        <Badge badgeContent={totalQuantity} color="secondary">
          <ShoppingCart />
        </Badge>
        <Typography style={{ marginLeft: 10 }}>Cart</Typography>
      </Container>
      <LoginDialog open={open} setOpen={setOpen} /* setAccountPresent={setAccountPresent} */ />
    </Wrapper>
  )
}

export default CustomButton
