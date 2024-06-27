import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, Button, styled } from '@mui/material'

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../feature/cartSlice';

const LeftContainer = styled(Box)(({ theme }) => ({
  minWidth: '40%',
  padding: '40px 0 0 80px',
  [theme.breakpoints.down('lg')]: {
    padding: '20px 40px'
  }
}));

const Image = styled('img')({
  padding: '15px',
  width: '90%'
});

const StyledButton = styled(Button)(({ theme }) => ({

  width: '46%',
  borderRadius: 2,
  height: 50,
  color: '#FFF',
  [theme.breakpoints.down('lg')]: {
    width: '46%',
  },
  [theme.breakpoints.down('md')]: {
    width: '48%',
  },
  [theme.breakpoints.down('sm')]: {
    width: '48%',
  }
}));


//============================================function starts===================================
const ActionItem = (props) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* console.log(props.itemData.thumbnail); */

  const goToCart = () => {
    navigate('/cart');
  };
  return (
    <LeftContainer>
      <Box style={{ padding: '15px 20px', border: '1px solid #f0f0f0' }}>
        <Image src={props.itemData.images} style={{ width: 290}} alt="productImage" />
        {console.log(props.itemData)}
      </Box>
      <StyledButton onClick={()=>dispatch(addToCart(props.itemData))} style={{ marginRight: 10, background: '#ff9f00' }} variant='contained'><ShoppingCartIcon />Add to Cart</StyledButton>
      <StyledButton onClick={goToCart} style={{ background: '#fb641b' }} variant='contained'><FlashOnIcon />Go to Cart</StyledButton>
    </LeftContainer>
  )
}

export default ActionItem