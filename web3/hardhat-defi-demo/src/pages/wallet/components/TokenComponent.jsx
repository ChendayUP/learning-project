// TokenComponent.js
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

function TokenComponent({ contract, address }) {
  const [balance, setBalance] = useState(0);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    async function fetchBalance() {
      const balance = await contract.balanceOf(address);
      setBalance(ethers.utils.formatEther(balance));
    }
    fetchBalance();
  }, [contract, address]);

  async function handleTransfer() {
    await contract.transfer(recipient, ethers.utils.parseEther(amount));
  }

  return (
    <div>
      <h2>My Token Balance: {balance} MTK</h2>
      <input
        type="text"
        placeholder="Recipient address"
        onChange={(e) => setRecipient(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleTransfer}>Transfer</button>
    </div>
  );
}

export default TokenComponent