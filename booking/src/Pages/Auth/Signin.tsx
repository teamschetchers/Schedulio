import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { FormControl, FormLabel } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginGoogle, signin } from "../../Redux/Admin/admin.actions";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import "./Auth.css";

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignIn = (event) => {
    event.preventDefault();
    dispatch(signin(email, password, navigate) as any);
  };

  const user = useSelector((state: any) => state.login);
  const { success, userInfo } = user;

  const [usr, setUsr] = useState({} as any);

  useEffect(() => {
    setUsr(userInfo);
  }, [userInfo]);

  return (
    <>
      {" "}
      {usr && usr?.role === "admin" && navigate("/admin")}
      {usr && usr?.role === "user" && navigate("/")}
      <Box component="form" onSubmit={handleSignIn} noValidate>
        <FormControl>
          <FormLabel>Email Address</FormLabel>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            name="email"
            autoComplete="email"
            placeholder="e.g. saunatime@gmail.com"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormLabel>Password</FormLabel>
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          type="password"
          id="password"
          autoComplete="current-password"
          placeholder="*** *** ***"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 3,
              backgroundColor: "#38C2E0",
              width: "250px",
              height: "40px",
              display: "flex",
            }}
          >
            Login
          </Button>
        </Box>
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
        >
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              var decoded = jwt_decode(credentialResponse.credential);
              console.log(decoded);
              dispatch(loginGoogle(decoded) as any);
            }}
            auto_select
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default Signin;
