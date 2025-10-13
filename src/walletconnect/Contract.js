
import { ethers } from "ethers";
    import  {contract2, contractABI2} from "../Abi/contracts"
      async function  makecontract() {
    try {
           if (!window.ethereum) return alert("MetaMask not found!");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    // console.log(signer,"si teh signer")

  

//     // const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const contract =  new ethers.Contract(contract2, contractABI2, signer);
   
    // console.log(contract.functions,"function in contract");
console.log("Methods in contract:", contract.interface.fragments.map(f => f.name));

return contract;
    } catch (error) {
        console.error(error,"isnytyheb  erroror  of contract ")
        return null

    }
     
 
    }


    export {makecontract}