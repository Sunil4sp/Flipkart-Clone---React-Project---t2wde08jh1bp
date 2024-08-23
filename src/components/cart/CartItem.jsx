import { Card, Box, ButtonGroup, Typography, Button, styled } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { /* removeItem, */ decreaseItemQuantity, increaseItemQuantity } from '../../feature/cartSlice';


const Component = styled(Card)`
    border-top: 1px solid #f0f0f0;
    border-radius: 0px;
    display: flex;
`;

const LeftComponent = styled(Box)`
    margin: 20px; 
    display: flex;
    flex-direction: column;
`;

const SmallText = styled(Typography)`
    color: #878787;
    font-size: 14px;
    margin-top: 10px;
`;

const Cost = styled(Typography)`
    font-size: 18px;
    font-weight: 600;
`;

const MRP = styled(Typography)`
    color: #878787;
`;

const Discount = styled(Typography)`
    color: #388E3C;
`;

/* const Remove = styled(Button)`
    margin-top: 20px;
    font-size: 16px;
`; */
const ButtonComponent = styled(ButtonGroup)`
    margin-top: 30px;
`;

const StyledButton = styled(Button)`
    border-radius: 50%;
`;

const CartItem = ({ item={}, totalQuantity=0, totalprice=0, quantity=0, price=0 }) => {

    const { cart } = useSelector((state) => state.allCart);
    console.log("Cart from Redux state:", cart);

    useEffect(() => {
        if(cart){
             localStorage.setItem("shoppingCart", JSON.stringify(cart));
        }
    }, [cart])

    /* console.log("Item:", item);
    console.log("Quantity:", quantity);
    console.log("Total Price:", totalprice);
    console.log("Total Quantity:", totalQuantity); */


    const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png';

    const dispatch = useDispatch();
    return (
        <Component>
            <LeftComponent>
                <img src={item.thumbnail || 'default-thumbnil.jpg'} style={{ height: 110, width: 110 }} alt=''/>
                
                <ButtonComponent>
                    <StyledButton onClick={() => dispatch(decreaseItemQuantity(item.id))}>-</StyledButton>
                    <Button disabled>{item.quantity || 0}</Button>
                    <StyledButton onClick={() => dispatch(increaseItemQuantity(item.id))}>+</StyledButton>
                </ButtonComponent>

            </LeftComponent>
            <Box style={{ margin: 20 }}>
                <Typography>{item.title}</Typography>
                <SmallText>Seller: RetailNet
                    <span><img src={fassured} style={{ width: 50, marginLeft: 10 }} alt=''/></span>
                </SmallText>
                <Typography style={{ margin: '20px 0' }}>
                    <Cost component="span">₹{Math.round(30*item.price-20)}</Cost>&nbsp;&nbsp;&nbsp;
                    <MRP component="span"><strike>₹{Math.round(30*item.price)}</strike></MRP>&nbsp;&nbsp;&nbsp;
                    <Discount component="span">20 off</Discount>
                </Typography>
                <Box>{item.totalQuantity || 0}</Box>
                {/* <Remove onClick={() => dispatch(decreaseItemQuantity(item.id) */} {/* removeItem(item.id))}>Remove</Remove> */}
            </Box>
        </Component>
    )
}

export default CartItem;