import { ethers } from 'ethers';
import React, { useState } from 'react';

function SendTransaction() {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  const sendETH = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const tx = await signer.sendTransaction({
          to: recipient,
          value: ethers.parseEther(amount)
        });
        console.log("Transaction sent:", tx.hash);
        await tx.wait();
        console.log("Transaction confirmed");
      } catch (error) {
        console.error("Error sending transaction:", error);
      }
    }
  };

  return (
    <div>
      <h2>Send ETH</h2>
      <input 
        type="text" 
        placeholder="Recipient Address" 
        value={recipient} 
        onChange={(e) => setRecipient(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Amount in ETH" 
        value={amount} 
        onChange={(e) => setAmount(e.target.value)} 
      />
      <button onClick={sendETH}>Send</button>
    </div>
  );
}

export default SendTransaction