import React from "react";
import { NavLink } from "react-router-dom";
import MarvelLogo from "./Marvel_Logo.svg";
import { Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Home = () => {
  return (
    <div className="flex-col justify-center items-center md:p-16 p-8">
      <div className="mb-4">
        <img src={MarvelLogo} className="marvel-logo mt-8" alt="logo" />
        <h1 className="md:text-8xl text-4xl font-bold my-8">
          Welcome to Marvel Universe Dashboard
        </h1>
      </div>

      <NavLink to="/details" className="">
        <Button
          size="large"
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          color="error"
        >
          See the full list of Marvel Characters
        </Button>
      </NavLink>
    </div>
  );
};

export default Home;
