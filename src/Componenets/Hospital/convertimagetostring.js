import axios from "axios";


const PINATA_API_KEY = "9141a4ec60e6d5879945"; // Replace with your Pinata API Key
const PINATA_SECRET_API_KEY = "0db07221d3403e0ccaa4a201186cb501855a03885c5bdb7bd253e353a7dcb02d"; // Replace with your Pinata Secret

  export async function imagetopinata(medicinearray){
let images=[]

    if(!medicinearray.length>0) return [];

 for (let i = 0; i < medicinearray.length; i++) {
let file=medicinearray[i]

let cid=await uploadtopinataa(file)
 const url = `https://gateway.pinata.cloud/ipfs/${cid}`;
   
console.log("is the cids ",cid)
images.push(url)
    
 }


 if (images.length==medicinearray.length) {
    return images
 }
 return null

 




}

 async function uploadtopinataa(file){
try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          maxBodyLength: "Infinity",
          headers: {
            "Content-Type": `multipart/form-data`,
            pinata_api_key: PINATA_API_KEY,
            pinata_secret_api_key: PINATA_SECRET_API_KEY,
          },
        }
      );

      return res.data.IpfsHash; // This is the CID
    } catch (err) {
        
      console.error("Pinata upload error:", err);
      alert("Failed to upload file to Pinata");
    }
}