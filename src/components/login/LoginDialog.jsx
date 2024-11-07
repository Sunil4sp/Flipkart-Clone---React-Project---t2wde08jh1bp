import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setLoginStatus, setUserDetails } from "../../feature/userSlice";
import {
  Dialog,
  Box,
  Typography,
  TextField,
  Button,
  styled
} from "@mui/material";

const Component = styled(Box)`
  height: 70vh;
  width: 90vh;
  
`;

const Image = styled(Box)`
  background: #2874f0
    url(https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png)
    center 85% no-repeat;
  height: 82.75%;
  width: 28%;
  padding: 45px 35px;
  & > p,
  & > h5 {
    color: #ffffff;
    font-weight: 600;
  }
`;
const Wrapper = styled(Box)`
  padding: 10px 35px;
  display: flex;
  flex: 1;
  overflow: auto;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 15px;
  }
`;
const LoginButton = styled(Button)`
  text-transform: none;
  background: #fb641b;
  color: #fff;
  height: 48px;
  border-radius: 2px;
  font-weight: 600;
`;

const RequestOTP = styled(Button)`
  text-transform: none;
  background: #fff;
  color: #2874f0;
  height: 48px;
  border-radius: 2px;
  font-weight: 600;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;
const Text = styled(Typography)`
  color: #878787;
  font-size: 12px;
`;
const CreateAccount = styled(Typography)`
  margin: auto 0 5px 0;
  text-align: center;
  color: #2874f0;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
`;
const accountInitialValues = {
  login: {
    view: "login",
    heading: "Login",
    subHeading: "Get access to your Orders, Wishlist and Recommendations",
  },
  signup: {
    view: "signup",
    heading: "Looks like you're new here",
    subHeading: "Signup to get started",
  },
};

//function starts
//{open, setOpen} getting as props
const LoginDialog = (props) => {
  
  const {isLoggedIn} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [account, toggleAccount] = useState(accountInitialValues.login);

  const handleClose = () => {
    props.setOpen(false);
    toggleAccount(accountInitialValues.login);
  };
  const toggleSignup = () => {
    toggleAccount(accountInitialValues.signup);
  };

  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    phone: '',
    isLoggedIn: false
  });

  // Local storage implementation begin here

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleSignup = () => {
    if (
      userProfile.name !== "" &&
      userProfile.email !== "" &&
      userProfile.password !== "" &&
      userProfile.username !== " " &&
      userProfile.phone !== ""
    ) {
      const profileData = {
        name: userProfile.name,
        email: userProfile.email,
        password: userProfile.password,
        username: userProfile.username,
        phone: userProfile.phone
      }
      localStorage.setItem("userProfile", JSON.stringify(profileData));
      dispatch(setUserDetails(profileData));
      dispatch(setLoginStatus(true));
      
      alert("Account created successfuly");
      // window.location.reload();
      handleClose();
    } else {
      alert("All fields are required");
    }
  };

  const handleLogin = () => {
    const storedProfile = JSON.parse(localStorage.getItem('userProfile'));
    if (
      storedProfile && 
      loginEmail === storedProfile.email && 
      loginPassword === storedProfile.password
      ) {
      dispatch(setUserDetails(storedProfile));
      dispatch(setLoginStatus(true));
       
      alert("Welcome back, Logged In successfully");
      props.setOpen(false);
    } 
    else {
      alert("Enter valid credential");
    }
  };

  if (!isLoggedIn) {
  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      PaperProps={{ sx: { maxWidth: "unset" } }}
    >
      <Component>
        <Box style={{ display: "flex", height: "100%" }}>
          <Image>
            <Typography variant="h5">{account.heading}</Typography>
            <Typography style={{ marginTop: 20 }}>
              {account.subHeading}
            </Typography>
          </Image>
          {account.view === "login" ? (
            <Wrapper>
              <TextField
                variant="standard"
                onChange={(e) => setLoginEmail(e.target.value)}
                name="name"
                label="Enter Email Id."
                type="email"
              />
              <TextField
                variant="standard"
                onChange={(e) => setLoginPassword(e.target.value)}
                name="password"
                label="Enter Password"
                type="password"
              />
              <Text>
                By continuing, you agree to ShopNow's Terms of Use and Privacy
                Policy.
              </Text>
              <LoginButton onClick={handleLogin}>Login</LoginButton>
              <Typography style={{ textAlign: "center" }}>OR</Typography>
              {/* <RequestOTP>Request OTP</RequestOTP> */}
              <Typography style={{ textAlign: "center" }}>New to ShopNow | Signup?</Typography>
              <CreateAccount onClick={toggleSignup}>
                 {/* <br></br> */}Create an account
              </CreateAccount>
            </Wrapper>
          ) : (
            <Wrapper>
              <TextField
                variant="standard"
                onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                name="name"
                label="Enter name"
              />
              <TextField
                variant="standard"
                onChange={(e) => setUserProfile({...userProfile, username: e.target.value})}
                name="username"
                label="Enter Username"
              />
              <TextField
                variant="standard"
                onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
                name="email"
                label="Enter Email"
              />
              <TextField
                variant="standard"
                onChange={(e) => setUserProfile({...userProfile, password: e.target.value})}
                name="password"
                label="Enter Password"
                type="password"
              />
              <TextField
                variant="standard"
                onChange={(e) => setUserProfile({...userProfile, phone: e.target.value})}
                name="phone"
                label="Enter Phone"
              />
              <LoginButton onClick={handleSignup}>Continue</LoginButton>
            </Wrapper>
          )}
        </Box>
      </Component>
    </Dialog>
    )
    }
    else {
      return null; // Do not render anything if the user is logged in
    }
};
export default LoginDialog;
