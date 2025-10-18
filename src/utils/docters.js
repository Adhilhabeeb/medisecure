import { fetchdoctores } from "@/Componenets/docter/addpatinettodocter";

  
  

  async function filterdocterbasedonhospital(hospitalmname) {
 let fecheduser= await fetchdoctores()
if (fecheduser && hospitalmname) {

let doctersfiler=fecheduser.filter((el)=>el.hospitalname.includes(hospitalmname))

return doctersfiler;
}
  
}
  
 


 
  const doctors = [
  { id: 1, name: "Dr. Rajesh Kumar", specialization: "Orthopedic" },
  { id: 2, name: "Dr. Meera Nair", specialization: "Eye Specialist" },
  { id: 3, name: "Dr. Anil Menon", specialization: "Cardiologist" },
  { id: 4, name: "Dr. Priya Varghese", specialization: "Dermatologist" },
  { id: 5, name: "Dr. Suresh Babu", specialization: "Neurologist" },
  { id: 6, name: "Dr. Shalini Thomas", specialization: "Gynecologist" },
  { id: 7, name: "Dr. Manoj Pillai", specialization: "Pediatrician" },
  { id: 8, name: "Dr. Divya Joseph", specialization: "ENT Specialist" },
  { id: 9, name: "Dr. Arun George", specialization: "Dentist" },
  { id: 10, name: "Dr. Neha Krishnan", specialization: "Psychiatrist" }
];
export{filterdocterbasedonhospital,checksignisdocter}



async function checksignisdocter(docteremail) {
  let fetcheduers=await fetchdoctores()
if (fetcheduers.length>0&& docteremail) {

  return fetcheduers.some(el=>el.docteremail==docteremail)
  console.log(fetcheduers,"is the fetched users in checksigndocter")
  
}
  
}
