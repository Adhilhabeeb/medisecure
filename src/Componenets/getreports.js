import {makecontract} from "../walletconnect/Contract"
 
 async function getreports(patient) {
  console.log(patient.name,"is the passedname", patient.hospitalname)

let contract=await makecontract()
try {
    
let reports= await contract.getreports(  patient.hospitalname ,patient.name)

console.log (reports,"is the  reports")

if (reports.length>0) {
// console.log(JSON.parse(reports[0][3])[0],"  getterd value",reports)
let reportmpped=reports.map(el=>{

  let [date,doctername,spacilist,imagepath,medicine]=el
let parseddata ={
  date,doctername,docterspecilist:spacilist,imagepath:JSON.parse(imagepath),medicines:JSON.parse(medicine)
}
  return parseddata;
})

// console.log(reportmpped,"is the mapped reports")
 return reportmpped;
}

} catch (error) {
  console.log(error,"in getrepirtr")
  return []

}
return []
}

export {getreports}