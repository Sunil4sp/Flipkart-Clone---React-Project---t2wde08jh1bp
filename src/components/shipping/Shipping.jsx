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

  /* const [userName, setUserName] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userPhone, setUserPhone] = useState('');

  /* const [ accountPresent, setAccountPresent] = useState(true); */
  /*const [open, setOpen] = useState(false);

  const { cart, totalPrice, totalQuantity } = useSelector(
    (state) => state.cart
  );
  const { name, address, phoneNumber, isLoggedIn } = useSelector(
    (state) => state.user);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoggedIn) {
      setOpen(true); // Show login dialog if not logged in
    }
  }, [isLoggedIn]);

  const handleUpdateUser = () => {
    const userData = {
      userName : name,
      userAddress: address,
      userPhone: phoneNumber,
    };
    dispatch(setUserDetails(userData));
    dispatch(setLoginStatus(true)); // Set user as logged in
    console.log(setLoginStatus);
    
    setOpen(false);
  };

  const orderPlaced = () => {
    console.log(isLoggedIn);

    if (!isLoggedIn) {
      // User is not logged in, redirect to login page
      setOpen(true);
      return;
    }
    if (userName !== "" && userAddress !== "" && userPhone !== "") {
      alert("✨Congratulation! Your Order has been Placed Successfully");

      setUserName("");
      localStorage.removeItem("shoppingCart");

      navigate("/");
      window.location.reload();
    } else 
        /* alert("Please Login to place order");
        navigate("/login");
        alert("Please fill in all details to place the order.");
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
    <LoginDialog open={open} setOpen={setOpen} onLoginSuccess={handleUpdateUser} />
    </>
  ); */
  return(
    <div style={{margin: '280px 400px', padding: '30px'}}> Congratulations ! your order has been placed successfully.
    </div>
  )
};

export default Shipping;
