   export  async function connectWallet() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    return accounts[0]
    } else {
      return false
      alert("MetaMask not found!");
    }
  }