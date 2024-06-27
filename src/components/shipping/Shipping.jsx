import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginDialog from "../login/LoginDialog";
import TotalView from "../cart/TotalView";

import {
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Card,
  Input,
  Grid,
  styled,
  FormGroup,
} from "@mui/material";


const OuterComponent = styled(Card)`
  border-top: 2px solid #f0f0f0;
  border-radius: 0px;
  display: flex;
`;

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

const FormInput = styled(FormControl)({
  margin: "15px 0",
});

const COD = styled(Typography)({
  margin: "30px 50px",
  display: "flex",
  flexDirection: "row-reverse",
  color: "#878787",
});

const Shipping = () => {
  const [userName, setUserName] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userPhone, setUserPhone] = useState('');

  const [ setAccountPresent] = useState(true);
  const [open, setOpen] = useState(false);

  /* const openDialog = () => {
    setOpen(true);
  } */

    setOpen(true);

  const { cart, totalPrice, totalQuantity } = useSelector(
    (state) => state.allCart
  );
  const navigate = useNavigate();

  const orderPlaced = () => {
    if (userName !== "" && userAddress !== "" && userPhone !== "") {
      alert("✨Congratulation!🎊, Your Order ❤ has been Placed Successfully");
      setUserName("");
      localStorage.removeItem("shoppingCart");
      navigate("/");
      window.location.reload();
    } else alert("🙏Please Enter All the details");
  };

  return (
    <>
    <Component container>
      <LeftComponent item lg={9} md={9} sm={12} xs={12}>
        <Header>
          <Typography style={{ fontWeight: 600, fontSize: 18 }}>
            Enter Details for Shipping
          </Typography>
        </Header>
        <OuterComponent>
          <Box style={{ alignItem: "center", width: "100%", margin: "0 40px" }}>
            <FormGroup style={{ margin: "15px 0" }}>
              <FormInput>
                <InputLabel htmlFor="my-input">Enter your Name</InputLabel>
                <Input
                  onChange={(e) => setUserName(e.target.value)}
                  value={userName}
                  id="my-input"
                  aria-describedby="my-helper-text"
                />
              </FormInput>
              <FormInput>
                <InputLabel htmlFor="my-add">Enter Your Address</InputLabel>
                <Input onChange={(e) => setUserAddress(e.target.value)}
                  value={userAddress} 
                id="my-add" aria-describedby="my-helper-text" />
              </FormInput>
              <FormInput>
                <InputLabel htmlFor="my-near">Nearest Landmark</InputLabel>
                <Input id="my-near" aria-describedby="my-helper-text" />
              </FormInput>
              <FormInput>
                <InputLabel htmlFor="my-number">Phone number</InputLabel>
                <Input onChange={(e) => setUserPhone(e.target.value)}
                  value={userPhone}
                 id="my-number" aria-describedby="my-helper-text" />
              </FormInput>
            </FormGroup>
          </Box>
        </OuterComponent>

        <BottomWrapper>
          <StyledButton onClick={orderPlaced} variant="contained">
            Place Order
          </StyledButton>
        </BottomWrapper>

        <COD>
          NOTE: Due to technical issue, we are only accepting COD payment
        </COD>
      </LeftComponent>

      <Grid item lg={3} md={3} sm={12} xs={12}>
        <TotalView
          cart={cart}
          totalPrice={totalPrice}
          totalQuantity={totalQuantity}
        />
      </Grid>
    </Component>
    <LoginDialog open={open} setOpen={setOpen} setAccountPresent={setAccountPresent} />
    </>
  );
};

export default Shipping;
