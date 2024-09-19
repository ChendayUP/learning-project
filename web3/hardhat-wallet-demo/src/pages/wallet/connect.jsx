import { ethers } from 'ethers';
import React, { useState, useEffect } from 'react';

function Wallet() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [chainID, setChainID] = useState('');
  const [balance, setBalance] = useState('');


  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (!window.ethereum) {
          console.log('metamask钱包没有安装')
          return
        }
        const provider = new ethers.BrowserProvider(window.ethereum);
        // const provider = new ethers.providers.Web3Provider(window.ethereum)
        setProvider(provider);
        const accounts = await provider.send("eth_requestAccounts", []);
        const userAccount = accounts[0]
        setAccount(userAccount);
        // 读取chainid
        const { chainId } = await provider.getNetwork()
        setChainID(chainId)
        // 读取ETH余额
        const signer = await provider.getSigner()
        const userBalance = await provider.getBalance(signer.getAddress());
        setBalance(userBalance)
        console.log(`以太坊余额： ${ethers.formatUnits(userBalance)}`)
      } catch (error) {
        console.error("Failed to connect wallet:", error);
      }
    } else {
      console.log("Please install MetaMask!");
    }
  };

  const disconnectWallet = () => {
    setProvider(null);
    setAccount(null);
  };

  return (
    <div>
      {!account ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <div>
          <p>Connected: {account}</p>
          <p>balance: {`${balance}`}</p>
          {/* <p>balance: {`${ethers.formatUnits(balance)}`}</p> */}
          <p>chainID: {chainID.toString()}</p>
          <button onClick={disconnectWallet}>Disconnect</button>
        </div>
      )}
    </div>
  );
}

export default Wallet