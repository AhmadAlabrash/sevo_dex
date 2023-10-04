import React from "react";
import Logo from "../logo.png";
import { Link } from "react-router-dom";


function Header() {

  return (
    <>
    <header>
      <div className="leftH">
        <img src={Logo} alt="logo" className="logo" />
        <Link to="/" className="link">
          <div className="headerItem">Swap</div>
        </Link>
        <Link to="/bridge/" className="link">
          <div className="headerItem">Bridge</div>
        </Link>
        <Link to="/buy" className="link">
          <div className="headerItem">Buy Crypto</div>
        </Link>
      </div>
      <div className="rightH">
      <w3m-network-button />
      <w3m-button />
        
      </div>
    </header>
  </>

  );
}

export default Header;

