import React, { useState, useEffect } from "react";
import { InputNumber,Input, Popover, Radio, Modal, message, Button } from "antd";
import {
  ArrowDownOutlined,
  DownOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import tokenListop from "../tokenListop.json";
import tokenListpo from "../tokenListpo.json";
import tokenListeth from "../tokenListeth.json";
import tokenListbs from "../tokenListbs.json";
import tokenListar from "../tokenListar.json";

import axios from "axios";
import { ethers } from 'ethers';

const qs = require('qs');


function Swap(props) {
  const { provider , setProvider , account , setAccount , network  } = props;

  let tokenList , networkName , baseUrl ;


  switch (network) {
    case 1:
      tokenList = tokenListeth ;
      networkName = 'Ethereum' ;
      baseUrl = 'https://api.0x.org'
      
      break;
    case 10:
      tokenList = tokenListop ;
      networkName = 'optimism';
      baseUrl = 'https://optimism.api.0x.org'
     
      break;
    case 56:
      tokenList = tokenListbs ;
      networkName = 'bsc';
      baseUrl = 'https://bsc.api.0x.org'
    
      break;
    case 137:
        tokenList = tokenListpo ;
        networkName = 'polygon';
        baseUrl = 'https://polygon.api.0x.org'
       
        break;
    case 42161:
        tokenList = tokenListar ;
        networkName = 'arbitrum';
        baseUrl = 'https://arbitrum.api.0x.org'
   
        break;    
  

    }
  const [contra, setContra] = useState(null)


  const [messageApi, contextHolder] = message.useMessage();
  const [slippage, setSlippage] = useState(2.5);
  const [tokenOneAmount, setTokenOneAmount] = useState(null);
  const [tokenTwoAmount, setTokenTwoAmount] = useState(null);
  const [tokenOne, setTokenOne] = useState(tokenList[0]);
  const [tokenTwo, setTokenTwo] = useState(tokenList[1]);
  const [isOpen, setIsOpen] = useState(false);
  const [changeToken, setChangeToken] = useState(1);
  const [prices, setPrices] = useState(null);
  const [txDetails, setTxDetails] = useState({
    to:null,
    data: null,
    value: null,
  }); 

  const [isLoading , setIsLoading] = useState(false);
  const [isApproving , setApproving] = useState(false);
  const [isSuccess , setIsSuccess] = useState(false);
  const [isError , setIsError] = useState(false);
  const [isFetchingPrices , setisFetchingPrices] = useState(false);


  function handleSlippageChange(e) {
    setSlippage(e.target.value);
  }

  async function changeAmount(e) { 
    await setTokenOneAmount(e.target.value);
    await fetchPrices(tokenOne.address , tokenTwo.address )

  }

  async function switchTokens() {
    setPrices(null);

    setTokenOneAmount(1);
    setTokenTwoAmount(0);
    const one = await tokenOne;
    const two = await tokenTwo;
    await setTokenOne(two);
    await setTokenTwo(one);
    await fetchPrices(two.address, one.address);

  }

  function openModal(asset) {
    setChangeToken(asset);
    setIsOpen(true);
  }

  async function modifyToken(i){
    setPrices(null);
    await  setTokenOneAmount(1);
    await  setTokenTwoAmount(1);
    if (changeToken === 1) {
      await  setTokenOne(tokenList[i]);
      await fetchPrices(tokenList[i].address, tokenTwo.address)
   /*   if (tokenOneAmount === '0' || tokenOneAmount === null){
        console.log('no amount inialed')
      }else{
        fetchPrices(tokenList[i].address, tokenTwo.address)
      } */
    } else {
      await setTokenTwo(tokenList[i]);
      await fetchPrices(tokenOne.address, tokenList[i].address);
    /*  if (tokenOneAmount === '0' || tokenOneAmount === null){
        console.log('no amount inialed')
      }else{
        fetchPrices(tokenOne.address, tokenList[i].address)      }*/
      
    }
    setIsOpen(false);
  }


  const approve = async ()=>{
    try{
   
    const zerox = '0xDef1C0ded9bec7F1a1670819833240f027b25EfF'  ;
    const erc20abi = [{ "inputs": [ { "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "symbol", "type": "string" }, { "internalType": "uint256", "name": "max_supply", "type": "uint256" } ], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" } ], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" } ], "name": "Transfer", "type": "event" }, { "inputs": [ { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" } ], "name": "allowance", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "approve", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "account", "type": "address" } ], "name": "balanceOf", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "burn", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "burnFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [ { "internalType": "uint8", "name": "", "type": "uint8" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" } ], "name": "decreaseAllowance", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" } ], "name": "increaseAllowance", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "transfer", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "transferFrom", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }]

    const contrac = await new ethers.Contract(tokenOne.address , erc20abi , provider)
    await setContra(contrac)

    
    const currentAllowance = await contrac.allowance(account, zerox);

    await console.log("############### Current Allownce is :"+currentAllowance);

    await console.log("############### Current Allownce is :"+tokenOneAmount * (10 ** tokenOne.decimals));

   if (currentAllowance < tokenOneAmount * (10 ** tokenOne.decimals)) {

      

     const signer = await  provider.getSigner();
     await setApproving(true)

     const trx = await contrac.connect(signer).approve(zerox, tokenOneAmount * (10 ** tokenOne.decimals))
     await trx.wait()

     await setApproving(false)
     await setTxDetails(trx.data);

          
    }



  }catch(err){
   // await setIsError(true)
    await setIsLoading(false)
    await setIsSuccess(false)
    await setApproving(false)

    
    //window.alert(err.data.values.message)
    }
 }

  const fetchDexSwap = async ()=>{
    await setIsError(false)
    


    await approve()
  .then(async() => {

      const params = {
        sellToken: tokenOne.address, 
        buyToken: tokenTwo.address, 
        sellAmount: tokenOneAmount * (10 ** tokenOne.decimals), 
        takerAddress: account };
      console.log(params)  ;
    
      const headers = {'0x-api-key': '3d2a5f2b-a9b5-430d-bf36-83ad4ccf6070'}; 
  
      const response = await fetch(
        `${baseUrl}/swap/v1/quote?${qs.stringify(params)}`, { headers }); 
    
      const quote = await response.json();
      await console.log(quote)
    
    
      const signer2 = await provider.getSigner();
      await setIsLoading(true)
    
      const trx2 = await signer2.sendTransaction({
       gasLimit: quote.gas,
       gasPrice: quote.gasPrice,
       to: quote.to,
       data: quote.data,
       value: quote.value,
       chainId: quote.chainId,
       });
    
       await trx2.wait()
    
       
       await setIsLoading(false)
       await setIsSuccess(true)
       await setTxDetails(trx2.data.tx);

    

   
  })
  .catch(async(error) => {

    await setIsError(true)
    await setIsLoading(false)
    await setIsSuccess(false)
  });


 
  
}

async function fetchPrices(one, two){
  try {
      await setIsError(false)
      await setisFetchingPrices(true);
      await setTokenTwoAmount(0);
      const paramsb = {
        buyToken: two,
        sellToken: one,
        sellAmount: tokenOneAmount * (10 ** tokenOne.decimals) ,
      };
      console.log(paramsb);
  
      const headersb = {'0x-api-key': '36c9b9ea-dc6b-4bd6-9bde-34b12d905a58'}; 
  
      const responseb = await fetch(
        `${baseUrl}/swap/v1/price?${qs.stringify(paramsb)}`, { headers : headersb }); 
  
      const quoteb = await responseb.json();
      console.log(quoteb);
      
      const price =await  parseFloat(quoteb.price);
  
  
      await  setPrices({
        'tokenOne' : 1 ,
        'tokenTwo' : 1 ,
        'ratio' : price

      })
       await setTokenTwoAmount((tokenOneAmount * price).toFixed(4))
      await setisFetchingPrices(false)
     
      //await console.log(prices)
  
    
  }catch (error)  {
    console.error("Fetching function error "+error);
    await setisFetchingPrices(false)
    await setIsError(true)
    await setTokenTwoAmount(0);
  }
};


 useEffect(()=>{

   fetchPrices(tokenOne.address, tokenTwo.address)
    
  }, [tokenOneAmount])

  useEffect(()=>{

    messageApi.destroy();

    if(isFetchingPrices){
      messageApi.open({
        type: 'loading',
        content: 'Fetching the best price ...',
        duration: 0,
      })
    }    

  },[isFetchingPrices])


  useEffect(()=>{

    messageApi.destroy();

    if(isLoading){
      messageApi.open({
        type: 'loading',
        content: 'Transaction is Pending...',
        duration: 0,
      })
    }    

  },[isLoading])

  useEffect(()=>{
    messageApi.destroy();
    if(isSuccess){
      messageApi.open({
        type: 'success',
        content: 'Transaction Successful',
        duration: 1.5,
      })
    }else if(isError){
      messageApi.open({
        type: 'error',
        content: 'Transaction Failed',
        duration: 1.50,
      })
    }


  },[isSuccess,isError])

  useEffect(()=>{

    messageApi.destroy();

    if(isApproving){
      messageApi.open({
        type: 'loading',
        content: 'Approving Transaction Is Pending...',
        duration: 0,
      })
    }    

  },[isApproving])

  const settings = (
    <>
      <div>Slippage Tolerance</div>
      <div>
        <Radio.Group value={slippage} onChange={handleSlippageChange}>
          <Radio.Button value={0.5}>0.5%</Radio.Button>
          <Radio.Button value={2.5}>2.5%</Radio.Button>
          <Radio.Button value={5}>5.0%</Radio.Button>
        </Radio.Group>
      </div>
    </>
  );

  return (
    <>
      {contextHolder}
      <Modal
        open={isOpen}
        footer={null}
        onCancel={() => setIsOpen(false)}
        title="Select a token"
      >
        <div className="modalContent">
          {tokenList?.map((e, i) => {
            return (
              <div
                className="tokenChoice"
                key={i}
                onClick={() => modifyToken(i)}
              >
                <img src={e.logoURI} alt={e.symbol} className="tokenLogo" />
                <div className="tokenChoiceNames">
                  <div className="tokenName">{e.name}</div>
                  <div className="tokenTicker">{e.symbol}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Modal>
      <div className="container">
      <div className="tradeBox">
        <div className="tradeBoxHeader">
          <h4>Swap</h4>
          <Popover
            content={settings}
            title="Settings"
            trigger="click"
            placement="bottomRight"
          >
            <SettingOutlined className="cog" />
          </Popover>
        </div>
        <div className="inputs">
          <Input
            placeholder="0"
            value={tokenOneAmount}
            onChange={changeAmount}
            disabled={!prices}
            
          />
          <Input  placeholder="0" value={tokenTwoAmount} disabled={true} />
          <div className="switchButton" onClick={switchTokens}>
            <ArrowDownOutlined className="switchArrow" />
          </div>
          <div className="assetOne" onClick={() => openModal(1)}>
            <img src={tokenOne.logoURI} alt="assetOneLogo" className="assetLogo" />
            {tokenOne.symbol}
            <DownOutlined />
          </div>
          <div className="assetTwo" onClick={() => openModal(2)}>
            <img src={tokenTwo.logoURI} alt="assetOneLogo" className="assetLogo" />
            {tokenTwo.symbol}
            <DownOutlined />
          </div>
        </div>
        <div className="swapButton"  onClick={( tokenOneAmount === '0' || tokenOneAmount === null || account === null || isLoading === true || isApproving === true)?(console.log('error swap button')) : (fetchDexSwap)}>Approve & Swap</div>
       
      </div>
            <p className="sentence">If You Get Nan Word , Just Wait A Second and You Will Get The Right Number  </p>
     </div>       

     
    </>
  );
}

export default Swap;
