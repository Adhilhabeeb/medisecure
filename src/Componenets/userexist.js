function Checkuseronlocalstorage() {
  
    // return localStorage.getItem("medisecureuser")?JSON.parse(localStorage.getItem("medisecureuser")):false


if(typeof window !== 'undefined'){
  // now access your localStorage
  const data = localStorage.getItem('medisecureuser');
return JSON.parse(data)
}
return null
}

export default Checkuseronlocalstorage

