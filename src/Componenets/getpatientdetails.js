import { makecontract } from "@/walletconnect/Contract"
import {
  query,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/firebase";




function getusers(params) {
    let array=[]
     const q = query(collection(db, "medidatabase"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetched = [];
      querySnapshot.forEach((doc) => {
        fetched.push({ ...doc.data(), id: doc.id });
      });
      const sorted = fetched.sort((a, b) => a.createdAt - b.createdAt);
array=sorted;
    });

    return array
    // console.log(array,"is user from database")
}

  export async function getpatientdetails(patient){
  let users =getusers()
  console.log(users,"is users")
    let {name,hospitalname}=patient
let contract= await makecontract()
    if (!contract| name.trim()==""| !name | !hospitalname  )return {message:" failed to connect contract "};


let patientdetails= await contract.getpatientdetails(hospitalname,name)
let patientde={
    name: patientdetails[0],
    age: patientdetails[1],
        bloodgroup: patientdetails[2]
  

}
console.log( patientde,"is patinet details")
return patientde
}