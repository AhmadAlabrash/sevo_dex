import "./App.css";
import Header from "./components/Header";
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

import Swap from "./components/Swap";
import Tokens from "./components/Tokens";
import { Routes, Route } from "react-router-dom";
import { useConnect, useAccount } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

function App() {
  const [provider, setProvider] = useState(null)
  const [account, setAccount] = useState(null)
  const [network, setNetwork] = useState(null)
  const [tokenListMainApp, settokenListMainApp] = useState(null)

  const loadBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(provider)
    const { chainId } = await provider.getNetwork()
    await setNetwork(chainId)
   



  }

  useEffect(() => {
    loadBlockchainData()
  }, [network])




  

  return (

    <div className="App">
      <Header account={account} setAccount={setAccount} network ={network}  />
      <div className="mainWindow">
{network === 1 || network === 56 || network === 137 || network === 42161 || network === 10 ? (        <Routes>
          <Route path="/" element={<Swap provider={provider} setProvider={setProvider} account={account} setAccount={setAccount} network={network} />} />
          <Route path="/tokens" element={<Tokens  />} />
        </Routes>): (<div>We are available now just on Ethereum , OP Mainnet , BSC , Polygon and Arbitrum .</div>)}
      </div>

    </div>
  )
}

export default App;
