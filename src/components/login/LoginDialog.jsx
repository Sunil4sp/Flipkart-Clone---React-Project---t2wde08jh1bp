import React, { useState } from "react";
import {
  Dialog,
  Box,
  Typography,
  TextField,
  Button,
  styled,
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
  padding: 25px 35px;
  display: flex;
  flex: 1;
  overflow: auto;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
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

//funtion starts
//{open, setOpen, setAccountPresent} getting as props
const LoginDialog = (props) => {

  const [account, toggleAccount] = useState(accountInitialValues.login);

  const handleClose = () => {
    props.setOpen(false);
    toggleAccount(accountInitialValues.login);
  };
  const toggleSignup = () => {
    toggleAccount(accountInitialValues.signup);
  };


  // Local storage implementation begin here

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [singupPassword, setSignupPassword] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [signupPhone, setSignupPhone] = useState("");

  const handleSignup = () => {
    if (
      signupName !== "" &&
      signupEmail !== "" &&
      singupPassword !== "" &&
      signupUsername !== " " &&
      signupPhone !== ""
    ) {
      localStorage.setItem("name", signupName);
      localStorage.setItem("email", signupEmail);
      localStorage.setItem("password", singupPassword);
      localStorage.setItem("phone", signupPhone);
      localStorage.setItem("username", signupUsername);

      alert("Account created successfuly");
      // window.location.reload();
      handleClose();
    } else {
      alert("All fields are required");
    }
  };

  const handleLogin = () => {
    if (
      loginEmail === localStorage.getItem('email') && loginPassword === localStorage.getItem('password')) {
      alert("Welcome back🙏, LogIn successfully");
      localStorage.setItem("signup", localStorage.getItem("name"));
      props.setOpen(false);
      props.setAccountPresent(true);
    } else {
      alert("Enter valid credential");
    }
  };

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
                label="Enter Email/Mobile number"
              />
              <TextField
                variant="standard"
                onChange={(e) => setLoginPassword(e.target.value)}
                name="password"
                label="Enter Password"
              />
              <Text>
                By continuing, you agree to Flipkart's Terms of Use and Privacy
                Policy.
              </Text>
              <LoginButton onClick={handleLogin}>Login</LoginButton>
              <Typography style={{ textAlign: "center" }}>OR</Typography>
              <RequestOTP>Request OTP</RequestOTP>
              <CreateAccount onClick={toggleSignup}>
                New to Flipkart? Create an account
              </CreateAccount>
            </Wrapper>
          ) : (
            <Wrapper>
              <TextField
                variant="standard"
                onChange={(e) => setSignupName(e.target.value)}
                name="name"
                label="Enter name"
              />
              <TextField
                variant="standard"
                onChange={(e) => setSignupUsername(e.target.value)}
                name="username"
                label="Enter Username"
              />
              <TextField
                variant="standard"
                onChange={(e) => setSignupEmail(e.target.value)}
                name="email"
                label="Enter Email"
              />
              <TextField
                variant="standard"
                onChange={(e) => setSignupPassword(e.target.value)}
                name="password"
                label="Enter Password"
              />
              <TextField
                variant="standard"
                onChange={(e) => setSignupPhone(e.target.value)}
                name="phone"
                label="Enter Phone"
              />
              <LoginButton onClick={handleSignup}>Continue</LoginButton>
            </Wrapper>
          )}
        </Box>
      </Component>
    </Dialog>
  );
};

export default LoginDialog;
