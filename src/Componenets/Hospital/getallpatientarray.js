
import {makecontract} from "../../walletconnect/Contract"

async  function getallpatietarray(contract,hospitalname) {

   try {
     return await contract.getallpatientsinhospital(hospitalname)
    
   } catch (error) {
    console.log(error.reason, "is yhe message ")
    return error
   }
    
}


  async function getallpatients() {
    let user = localStorage.getItem("medisecureuser");

    if (user) {
      let hospitaldetails = JSON.parse(user);

      try {
        //startfetching
        let cont = await makecontract();

        const Allpatientsar = await cont.getallpatientsinhospital(
          hospitaldetails.name
        );
        if (Allpatientsar && !Error.isError(Allpatientsar)) {
          let gg = Allpatientsar.map((r, i) => ({
            name: r.name,
            age: r.age,
            bloodgroup: r.bloodgroup,
          }));
          return gg;
          //endftechiung
        }
      } catch (error) {
        //endftechiung
       
        console.log(error, "is the error in getallpatients ", error.reason);
        return [];
      }

      // if (Allpatientsar && !Error.isError(Allpatientsar)) {

      //     let  gg=  Allpatientsar.map((r, i) => ( {name:r.name,age:r.age,bloodgroup:r.bloodgroup}));
      //     return gg
      // }else{
      //   return []
      // }
    }
  }
  async  function filterfromallpatients(data,search) {

if (data.length>0) {
    let  filterdata=data.filter(el=>el.name==search)
return filterdata
}
}

 async function getreports(hospitalname,name) {

let contract=await makecontract()
try {
    
let reports= await contract.getreports("amritha","sup79")

console.log(reports.length,"is the ropporyfs s from getreportfunctuin")
if (reports.length>0) {
console.log(JSON.parse(reports[0][3])[0],"is the reports in get f")
  
}
} catch (error) {
  console.log(error,"in getrepirtr")
}
}

export {getallpatietarray,filterfromallpatients,getallpatients}


