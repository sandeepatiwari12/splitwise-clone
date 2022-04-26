import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button";

const NavLinks = () => {
  return (
    <div>
      <Link to={"/login"} style={{ marginRight: "10px" }}>
        <Button variant={"success"}>Login</Button>
      </Link>

      <Link to={"/sign-up"} style={{ marginRight: "10px" }}>
        <Button variant={"warning"}>Sign Up</Button>
      </Link>

      <Link to={"/settings"}>
        <Button variant={"error"}>Settings</Button>
      </Link>
    </div>
  );
};

export default NavLinks;
