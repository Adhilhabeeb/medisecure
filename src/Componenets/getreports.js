import {makecontract} from "../walletconnect/Contract"
 
 async function getreports(patient) {
  console.log(patient.name,"is the passedname", patient.hospitalname)

let contract=await makecontract()
try {
    
let reports= await contract.getreports(  patient.hospitalname ,patient.name)

console.log(reports,"is the ropporyfs s from getreportfunctuin")
if (reports.length>0) {
console.log(JSON.parse(reports[0][3])[0],"is the reports in get f")
  
}
} catch (error) {
  console.log(error,"in getrepirtr")
}
}

export {getreports}