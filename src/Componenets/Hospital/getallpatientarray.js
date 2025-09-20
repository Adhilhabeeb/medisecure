async  function getallpatietarray(contract,hospitalname) {

   try {
     return await contract.getallpatientsinhospital(hospitalname)
    
   } catch (error) {
    console.log(error.reason, "is yhe message ")
    return error
   }
    
}

export {getallpatietarray}