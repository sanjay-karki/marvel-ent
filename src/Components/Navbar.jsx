import React from "react";
import { NavLink } from "react-router-dom";
import {ReactComponent as MarvelLogo} from "../Pages/Marvel_Logo.svg"

const Navbar = () => {
  const navbarItems = [
    { to: "/", name: "HOME" },
    { to: "/home", name: "HOME" },
    { to: "/details", name: "CHARACTERS" },
  ];
  const navItemClassName = `font-bold md:text-2xl text-xl transition-all text-white hover:text-red-700`
  return (
    <nav className="navbar-container sticky top-0 flex flex-row justify-center items-center md:gap-24 gap-8 md:p-8 p-4 bg-black" style={{zIndex: "999999999999"}}>
      {navbarItems.map((item, i) => {
        return (
          <NavLink
            to={item.to}
            className={({ isActive }) =>
              isActive ? `${navItemClassName} underline decoration-red-500` : `${navItemClassName}`
            }
            key={i}
          >
            {i===0 ? <MarvelLogo width={100} height={40} /> : item.name}
          </NavLink>
        );
      })}
    </nav>
  );
};

export default Navbar;
