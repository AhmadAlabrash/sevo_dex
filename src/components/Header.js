import React from "react";
import {Button, Modal} from "antd";
import Logo from "../logo.png";
import POL from "../polygon-matic-logo.svg";
import ETH from "../eth.svg";
import BNB from "../bnb.svg";
import WRN from "../wrn.svg";
import ARB from "../arb.png";
import OPT from "../opt.svg";
import AVA from "../ava.svg";

import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';


function Header(props) {

  const {account, setAccount , network , setNetwork} = props;
  const [isOpen , setIsOpen] = useState(false);
  const [net , setNet] = useState(false);

  const modifyChain = async (index)=>{
    await setNet(networkOptions[index].value)
    
    switch (networkOptions[index].value) {
      case '1' : 
      await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0x1', // Polygon Mainnet
                chainName: 'Ethereum Mainnet',
                rpcUrls: ['https://rpc.payload.de'], // Replace with the actual RPC URL
                nativeCurrency: {
                  name: 'ETH',
                  symbol: 'ETH',
                  decimals: 18,
                },
                blockExplorerUrls: ['https://etherscan.io'], // Replace with the actual block explorer URL
              },
            ],
          })
        await  window.location.reload();  
       break;
      case '56' :
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0x38', // Polygon Mainnet
              chainName: 'BNB Smart Chain Mainnet',
              rpcUrls: ['https://rpc-bsc.48.club'], // Replace with the actual RPC URL
              nativeCurrency: {
                name: 'BNB',
                symbol: 'BNB',
                decimals: 18,
              },
              blockExplorerUrls: ['https://bscscan.io'], // Replace with the actual block explorer URL
            },
          ],
        })
      await  window.location.reload();  
     break;
        
      case '10' :
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0xa', // Polygon Mainnet
              chainName: 'OP Mainnet',
              rpcUrls: ['https://optimism.llamarpc.com'], // Replace with the actual RPC URL
              nativeCurrency: {
                name: 'ETH',
                symbol: 'ETH',
                decimals: 18,
              },
              blockExplorerUrls: ['https://optimistic.etherscan.io/'], // Replace with the actual block explorer URL
            },
          ],
        })
      await  window.location.reload();  
     break;
      case '42161' :
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0xa4b1', // Polygon Mainnet
              chainName: 'Arbitrum Mainnet',
              rpcUrls: ['https://arbitrum.llamarpc.com'], // Replace with the actual RPC URL
              nativeCurrency: {
                name: 'ETH',
                symbol: 'ETH',
                decimals: 18,
              },
              blockExplorerUrls: ['https://arbiscan.io/'], // Replace with the actual block explorer URL
            },
          ],
        })
      await  window.location.reload();  
     break;
      case '137' :
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0x89', // Polygon Mainnet
              chainName: 'Polygon Mainnet',
              rpcUrls: ['https://polygon-rpc.com'], // Replace with the actual RPC URL
              nativeCurrency: {
                name: 'MATIC',
                symbol: 'MATIC',
                decimals: 18,
              },
              blockExplorerUrls: ['https://polygonscan.com'], // Replace with the actual block explorer URL
            },
          ],
        })
      await  window.location.reload();  
     break;  
     
     case '43114' :
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: '0xa86a', // Polygon Mainnet
            chainName: 'Avalanche Mainnet',
            rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'], // Remove the trailing whitespace
            nativeCurrency: {
              name: 'AVAx',
              symbol: 'AVAx',
              decimals: 18,
            },
            blockExplorerUrls: ['https://avascan.info/'], // Replace with the actual block explorer URL
          },
        ],
      });
      await window.location.reload();
      break; 
    }
  }
  

  const connectHandler = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = ethers.utils.getAddress(accounts[0])
    setAccount(account);
  }
  const networkOptions = [
    { 'value': '1', 'label': 'Ethereum' , 'img':ETH},
    { 'value': '137', 'label': 'Polygon' ,'img':POL},
    { 'value': '56', 'label': 'Binance Chain' , 'img':BNB },
    { 'value': '10', 'label': 'OP Mainnet','img':OPT },
    { 'value': '42161', 'label': 'Arbitrum' , 'img':ARB},
    { 'value': '43114', 'label': 'Avalanche' , 'img':AVA},

  ];
  useEffect(()=>{

    
     
   }, [net])


  return (
    <>

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

       
  {network === 137 ? (
    <div className="headerItem" onClick={() => setIsOpen(true)}>
      <img src={POL} alt="pol" className="eth" /> Polygon
    </div>
  ) : network === 1 ? (
    <div className="headerItem" onClick={() => setIsOpen(true)}>
      <img src={ETH} alt="ETH" className="eth" /> Ethereum
    </div>
  )  : network === 43114 ? (
    <div className="headerItem" onClick={() => setIsOpen(true)}>
      <img src={AVA} alt="Avalanche" className="eth" /> Avalanche
    </div>
  ) : network === 56 ? (
    <div className="headerItem" onClick={() => setIsOpen(true)}>
      <img src={BNB} alt="bnb" className="eth" /> Binance Chain
    </div>
  )  : network === 10 ? (
    <div className="headerItem" onClick={() => setIsOpen(true)}>
      <img src={OPT} alt="Optimiusm" className="eth" /> OP Mainnet
    </div>
  )  : network === 42161 ? (
    <div className="headerItem" onClick={() => setIsOpen(true)}>
      <img src={ARB} alt="Arbitrum" className="eth"   /> Arbitrum
    </div>
  ) : (
    <div className="headerItem" onClick={() => setIsOpen(true)} >
      <img src={WRN} alt="wrong network" className="eth" /> Wrong Network
    </div>
  )}    
  
   
        
        <div className="connectButton" onClick={connectHandler}>
          {account ? (account.slice(0,4) +"..." +account.slice(38)) : "Connect"}
        </div>
      </div>
    </header>
    <Modal
    open={isOpen}
    footer={null}
    onCancel={() => setIsOpen(false)}
    title="Select a Chain"
  >
    <div className="modalContent">
      {networkOptions?.map((e, i) => {
        return (
          <div
            className="tokenChoice"
            key={i}
            onClick={() => modifyChain(i)}
          >
            <img src={e.img} alt={e.label} className="tokenLogo" />
            <div className="tokenChoiceNames">
              <div className="tokenName">{e.label}</div>
              
            </div>
          </div>
        );
      })}
    </div>
  </Modal></>
  );
}

export default Header;


