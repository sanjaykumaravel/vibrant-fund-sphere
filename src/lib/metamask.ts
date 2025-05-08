
// Simple MetaMask integration
export const connectWallet = async (): Promise<string | null> => {
  if (!window.ethereum) {
    alert("Please install MetaMask to use this feature!");
    return null;
  }

  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    
    return accounts[0];
  } catch (error) {
    console.error("Error connecting to MetaMask:", error);
    return null;
  }
};

export const donate = async (amount: number, campaignId: string): Promise<boolean> => {
  if (!window.ethereum) {
    alert("Please install MetaMask to use this feature!");
    return false;
  }

  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    
    const transactionParameters = {
      to: '0x0000000000000000000000000000000000000000', // This would be the campaign contract address
      from: accounts[0],
      value: '0x' + (amount * 1e18).toString(16), // Convert ETH to Wei
      gas: '0x5208', // 21000 gas
    };

    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [transactionParameters],
    });

    // In a real app, we would add the transaction to a database
    console.log(`Transaction hash: ${txHash}`);
    console.log(`Donated ${amount} ETH to campaign ${campaignId}`);
    
    return true;
  } catch (error) {
    console.error("Error donating via MetaMask:", error);
    return false;
  }
};

export const withdrawDonation = async (campaignId: string): Promise<boolean> => {
  if (!window.ethereum) {
    alert("Please install MetaMask to use this feature!");
    return false;
  }
  
  try {
    // This would interact with the smart contract to withdraw funds
    // For demo purposes, just log the action
    console.log(`Withdrawn donation from campaign ${campaignId}`);
    return true;
  } catch (error) {
    console.error("Error withdrawing donation:", error);
    return false;
  }
};

// Add type definition for window.ethereum
declare global {
  interface Window {
    ethereum: {
      request: (params: { method: string; params?: any[] }) => Promise<any>;
    };
  }
}
