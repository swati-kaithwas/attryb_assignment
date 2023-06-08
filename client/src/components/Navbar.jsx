import React from "react";

const Navbar = () => {
  return (
    <div>
      <nav class="navbar" style={{ backgroundColor: "#e3f2fd" }}>
        <div>
          <img
            src={require("../Car/car-logo.png")}
            style={{ height: "45px", cursor: "pointer", marginLeft: "30px"}}
            alt="logo"
          />
        </div>
        <div class="d-flex gap-5">
          <button>home</button>
          <button>SignUp</button>
          <button>Login</button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
