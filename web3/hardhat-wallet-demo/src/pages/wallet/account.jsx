import { ethers } from 'ethers';
import React, { useState, useEffect } from 'react';

function AccountInfo() {
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('');

  const test = async (params) => {
    
  }

  useEffect(() => {
    console.log(typeof test)
    const getAccountInfo = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const address = await signer.getAddress();
          setAccount(address);
          const balance = await provider.getBalance(address);
          console.log(balance)
          setBalance(ethers.formatUnits(balance));
          // setBalance('12323');
        } catch (error) {
          console.error("Error fetching account info:", error);
        }
      }
    };

    getAccountInfo();

    // 监听账户变化
    window.ethereum.on('accountsChanged', getAccountInfo);

    return () => {
      window.ethereum.removeListener('accountsChanged', getAccountInfo);
    };
  }, []);

  return (
    <div>
      <h2>Account Information</h2>
      <p>Address: {account}</p>
      <p>Balance: {balance.toString()} ETH</p>
    </div>
  );
}

export default AccountInfo