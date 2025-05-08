
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
    
    // Log to help with debugging
    console.log(`Attempting to donate ${amount} ETH to campaign ${campaignId} from account ${accounts[0]}`);
    
    // For demo purposes, we're using a fake contract address
    // In a real app, this would be the actual campaign contract address
    const campaignAddress = '0x0000000000000000000000000000000000000000';
    
    // Convert ETH amount to Wei (as a hex string for MetaMask)
    const valueInWei = '0x' + (amount * 1e18).toString(16);
    
    console.log(`Value in Wei: ${valueInWei}`);
    
    const transactionParameters = {
      to: campaignAddress, // Campaign contract address
      from: accounts[0], // User's address
      value: valueInWei, // Amount in Wei (hexadecimal)
      gas: '0x5208', // 21000 gas limit (standard for ETH transfers)
    };
    
    console.log("Transaction parameters:", transactionParameters);
    
    try {
      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });
      
      console.log(`Transaction successful with hash: ${txHash}`);
      
      // In a real app, we would add the transaction to a database
      console.log(`Successfully donated ${amount} ETH to campaign ${campaignId}`);
      
      return true;
    } catch (txError) {
      // This catches errors like user rejection
      console.error("Transaction error:", txError);
      return false;
    }
  } catch (error) {
    console.error("Error in donate function:", error);
    return false;
  }
};

export const withdrawDonation = async (campaignId: string): Promise<boolean> => {
  if (!window.ethereum) {
    alert("Please install MetaMask to use this feature!");
    return false;
  }
  
  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    
    console.log(`Attempting to withdraw donation from campaign ${campaignId} for account ${accounts[0]}`);
    
    // For demo purposes - in a real app, this would interact with the smart contract
    // We're simulating a successful withdrawal here
    
    // In a real app, we would have code like:
    /*
    const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
    await contract.methods.withdrawDonation(campaignId).send({ from: accounts[0] });
    */
    
    console.log(`Successfully withdrawn donation from campaign ${campaignId}`);
    return true;
  } catch (error) {
    console.error("Error withdrawing donation:", error);
    return false;
  }
};

export const refundDonation = async (campaignId: string, amount: number): Promise<boolean> => {
  if (!window.ethereum) {
    alert("Please install MetaMask to use this feature!");
    return false;
  }
  
  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    
    console.log(`Attempting to refund ${amount} ETH from campaign ${campaignId} to account ${accounts[0]}`);
    
    // For demo purposes - in a real app, this would check campaign requirements and deadlines
    // before processing refund through the smart contract
    
    // In a real app with a smart contract, we would have code like:
    /*
    const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
    await contract.methods.requestRefund(campaignId).send({ from: accounts[0] });
    */
    
    console.log(`Successfully refunded ${amount} ETH from campaign ${campaignId} to ${accounts[0]}`);
    return true;
  } catch (error) {
    console.error("Error refunding donation:", error);
    return false;
  }
};

// Add type definition for window.ethereum
declare global {
  interface Window {
    ethereum: {
      request: (params: { method: string; params?: any[] }) => Promise<any>;
      on: (eventName: string, callback: (...args: any[]) => void) => void;
      removeListener: (eventName: string, callback: (...args: any[]) => void) => void;
      isMetaMask?: boolean;
    };
  }
}
