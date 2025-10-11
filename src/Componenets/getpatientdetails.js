import { makecontract } from "@/walletconnect/Contract"

  export async function getpatientdetails(patient){

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