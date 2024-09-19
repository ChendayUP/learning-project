import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();

        // 这里我们只获取最近的10笔交易
        // 注意: 这需要一个支持此功能的以太坊节点或服务
        const history = await provider.getHistory(address, 10);
        setTransactions(history);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div>
      <h2>Transaction History</h2>
      <ul>
        {transactions.map((tx, index) => (
          <li key={index}>
            To: {tx.to}, Value: {ethers.utils.formatEther(tx.value)} ETH
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionHistory