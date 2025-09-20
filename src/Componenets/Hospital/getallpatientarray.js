async  function getallpatietarray(contract,hospitalname) {

   try {
     return await contract.getallpatientsinhospital(hospitalname)
    
   } catch (error) {
    console.log(error.reason, "is yhe message ")
    return error
   }
    
}

  async  function filterfromallpatients(data,search) {

if (data.length>0) {
    let  filterdata=data.filter(el=>el.name==search)
return filterdata
}
}

export {getallpatietarray,filterfromallpatients}


