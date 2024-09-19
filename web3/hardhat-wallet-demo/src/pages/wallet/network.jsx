import { ethers } from 'ethers';
import React, { useState, useEffect } from 'react';

function NetworkInfo() {
  const [network, setNetwork] = useState(null);

  useEffect(() => {
    const getNetworkInfo = async () => {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        try {
          const network = await provider.getNetwork();
          setNetwork(network);
        } catch (error) {
          console.error("Error fetching network info:", error);
        }
      }
    };

    getNetworkInfo();

    // 监听网络变化
    window.ethereum.on('chainChanged', getNetworkInfo);

    return () => {
      window.ethereum.removeListener('chainChanged', getNetworkInfo);
    };
  }, []);

  return (
    <div>
      <h2>Network Information</h2>
      {network && (
        <p>
          Connected to: {network.name} (Chain ID: {`${network.chainId}`})
        </p>
      )}
    </div>
  );
}

export default NetworkInfo