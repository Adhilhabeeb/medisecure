import { makecontract } from "@/walletconnect/Contract"
import {
  query,
  collection,
  onSnapshot,
  getDocs
} from "firebase/firestore";
import { db } from "@/firebase";
import { getreports } from "./getreports";



async function getusers() {
  const q = query(collection(db, "medidatabase"));
  const snapshot = await getDocs(q);

  const fetched = [];
  snapshot.forEach((doc) => {
    fetched.push({ ...doc.data(), id: doc.id });
  });

  const sorted = fetched.sort((a, b) => a.createdAt - b.createdAt);
  return sorted;
}

  export async function getpatientdetails(patient){
  
 let users=await getusers()
console.log("usererreyyriryryr",users,"is",patient)
let message=null

    let {name,hospitalname}=patient

    // let usersfilter=users.filter((el)=>{
    //   return  
    // })
let contract= await makecontract()


    if (!contract| name.trim()==""| !name | !hospitalname  )return {message:"failed to connect contract ",patientde:[]};


let patientdetails= await contract.getpatientdetails(hospitalname,name)
let reports=await getreports({name,hospitalname})

console.log("is the rpeorts new:",reports
)
  let user=await contract.users(name)
console.log(user,"userffff")
let userfoundobj={}
try {

let userisloginer= await contract.getuseremial(name)
if (userisloginer) {
  let user=await contract.users(name)

userfoundobj=user
  console.log("is the user  from datasbe",...user)
}
console.log(userisloginer,"user foundf",)
} catch (error) { console.log(error.reason,"in useremail functiion calling ")
message=error.reason
 
}
let patientde={
    name: patientdetails[0],
    age: patientdetails[1],
        bloodgroup: patientdetails[2],
      
  

}

if (userfoundobj[0]) {
  patientde={...patientde,
    email:userfoundobj[1],
    contact:userfoundobj[2],
    hospitalname:userfoundobj[3]
  }
}
console.log( patientde,"is patinet details")
return {patientde,message:message,reports}
}