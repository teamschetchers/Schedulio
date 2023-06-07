import React, { useEffect, useState } from "react";
import logo from "./../../assets/group1.svg";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Signin from "./Signin";
import Signup from "./Signup";
import "./Auth.css";

import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });
  let [authMode, setAuthMode] = useState("signin");
  const user = useSelector((state: any) => state.login);
  const { success, userInfo } = user;

  const [usr, setUsr] = useState({} as any);

  useEffect(() => {
    setUsr(userInfo);
  }, [userInfo]);

  return (
    <>
      {usr && usr?.role === "admin" && navigate("/admin")}
      {usr && usr?.role === "user" && navigate("/")}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          mt: 3,
        }}
      >
        <Box
          sx={{
            width: isMobile ? "90%" : "50%",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img src={logo} alt={"auth"} />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "60rem",
                borderRadius: 3,
                backgroundColor: "white",
                padding: 4,
                marginTop: 4,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  m: 3,
                }}
              >
                <Box onClick={() => setAuthMode("signup")}>
                  <Typography
                    className={`${authMode === "signup" && "active"} `}
                  >
                    Create Account
                  </Typography>
                </Box>
                <Box onClick={() => setAuthMode("signin")}>
                  <Typography
                    className={`${authMode === "signin" && "active"} `}
                  >
                    Sign In
                  </Typography>
                </Box>
              </Box>
              {authMode === "signin" ? <Signin /> : <Signup />}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
