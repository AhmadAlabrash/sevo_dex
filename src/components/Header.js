import React from "react";
import Logo from "../logo.png";
import POL from "../polygon-matic-logo.svg";
import ETH from "../eth.svg";
import BNB from "../bnb.svg";
import WRN from "../wrn.svg";
import ARB from "../arb.png";
import OPT from "../opt.svg";

import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';


function Header(props) {

  const {account, setAccount , network } = props;

  const connectHandler = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = ethers.utils.getAddress(accounts[0])
    setAccount(account);
  }

  return (
    <header>
      <div className="leftH">
        <img src={Logo} alt="logo" className="logo" />
        <Link to="/" className="link">
          <div className="headerItem">Swap</div>
        </Link>
        <Link to="/tokens" className="link">
          <div className="headerItem">Tokens</div>
        </Link>
      </div>
      <div className="rightH">
        {}
  {network === 137 ? (
    <div className="headerItem">
      <img src={POL} alt="pol" className="eth" /> Polygon
    </div>
  ) : network === 1 ? (
    <div className="headerItem">
      <img src={ETH} alt="ETH" className="eth" /> Ethereum
    </div>
  ) : network === 56 ? (
    <div className="headerItem">
      <img src={BNB} alt="bnb" className="eth" /> Binance Chain
    </div>
  )  : network === 10 ? (
    <div className="headerItem">
      <img src={OPT} alt="Optimiusm" className="eth" /> OP Mainnet
    </div>
  )  : network === 42161 ? (
    <div className="headerItem">
      <img src={ARB} alt="Arbitrum" className="eth" /> Arbitrum
    </div>
  ) : (
    <div className="headerItem">
      <img src={WRN} alt="wrong network" className="eth" /> Wrong Network
    </div>
  )}
        
        
        <div className="connectButton" onClick={connectHandler}>
          {account ? (account.slice(0,4) +"..." +account.slice(38)) : "Connect"}
        </div>
      </div>
    </header>
  );
}

export default Header;


