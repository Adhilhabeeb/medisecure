"use client";

import React, { useState ,useEffect,useTransition} from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  MenuItem,
  Paper,
} from "@mui/material";
import { Addocter as adddocterfunction } from "@/Componenets/docter/addpatinettodocter";

export default function DocterDetailsPage() {

  const [sucess, setsucess] = useState(null)
  let [loading,startloading]=useTransition()
  const [docterdetails, setdocterdetails] = useState({
    docteremail: "",
    doctername: "",
    hospitalname: "",
    doctercontactnumber: "",
    specilist: "",
  });
const [error, seterror] = useState(false)

  useEffect(() => {
      setdocterdetails({...docterdetails,hospitalname:JSON.parse(localStorage.getItem("medisecureuser")).name})
  }, [])
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setdocterdetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit =   (e) => {
    e.preventDefault();
 startloading(async ()=>{
      let status= await    adddocterfunction(
      docterdetails
    )
if (status) {
  setsucess(status)
}else{
  seterror(true)
}
    

    
 })
    console.log("Doctor Details:", docterdetails);
  };

  return (

    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f9fafc",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 3,
          maxWidth: 500,
          width: "100%",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          mb={3}
          textAlign="center"
          color="primary"
        >
          Doctor Details Form
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Doctor Name"
            name="doctername"
            value={docterdetails.doctername}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label=" Enter Docter Email"
            name="docteremail"
            type="email"
            value={docterdetails.docteremail}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="Hospital Name"
            name="hospitalname"
            disabled
            value={docterdetails.hospitalname}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Contact Number"
            name="doctercontactnumber"
            type="tel"
            value={docterdetails.doctercontactnumber}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

        <TextField
  select
  label="Specialization / Degree"
  name="specilist"
  value={docterdetails.specilist}
  onChange={handleChange}
  fullWidth
  margin="normal"
  helperText="Select your medical specialty or degree"
>
  <MenuItem disabled>— General Medicine —</MenuItem>
  <MenuItem value="General Physician">General Physician</MenuItem>
  <MenuItem value="Family Medicine">Family Medicine</MenuItem>
  <MenuItem value="Internal Medicine">Internal Medicine</MenuItem>

  <MenuItem disabled>— Surgical Specialties —</MenuItem>
  <MenuItem value="General Surgery">General Surgery</MenuItem>
  <MenuItem value="Orthopedic Surgery">Orthopedic Surgery</MenuItem>
  <MenuItem value="Neurosurgery">Neurosurgery</MenuItem>
  <MenuItem value="Cardiothoracic Surgery">Cardiothoracic Surgery</MenuItem>
  <MenuItem value="Plastic Surgery">Plastic Surgery</MenuItem>
  <MenuItem value="Vascular Surgery">Vascular Surgery</MenuItem>
  <MenuItem value="ENT (Otolaryngology)">ENT (Otolaryngology)</MenuItem>
  <MenuItem value="Urology">Urology</MenuItem>
  <MenuItem value="Pediatric Surgery">Pediatric Surgery</MenuItem>
  <MenuItem value="Oncosurgery">Oncosurgery</MenuItem>

  <MenuItem disabled>— Internal Medicine Specialties —</MenuItem>
  <MenuItem value="Cardiology">Cardiology</MenuItem>
  <MenuItem value="Endocrinology">Endocrinology</MenuItem>
  <MenuItem value="Gastroenterology">Gastroenterology</MenuItem>
  <MenuItem value="Nephrology">Nephrology</MenuItem>
  <MenuItem value="Pulmonology (Chest Medicine)">Pulmonology (Chest Medicine)</MenuItem>
  <MenuItem value="Rheumatology">Rheumatology</MenuItem>
  <MenuItem value="Hematology">Hematology</MenuItem>
  <MenuItem value="Infectious Diseases">Infectious Diseases</MenuItem>

  <MenuItem disabled>— Diagnostic Specialties —</MenuItem>
  <MenuItem value="Radiology">Radiology</MenuItem>
  <MenuItem value="Pathology">Pathology</MenuItem>
  <MenuItem value="Microbiology">Microbiology</MenuItem>
  <MenuItem value="Biochemistry">Biochemistry</MenuItem>
  <MenuItem value="Laboratory Medicine">Laboratory Medicine</MenuItem>
  <MenuItem value="Nuclear Medicine">Nuclear Medicine</MenuItem>

  <MenuItem disabled>— Clinical & Support Specialties —</MenuItem>
  <MenuItem value="Anesthesiology">Anesthesiology</MenuItem>
  <MenuItem value="Critical Care Medicine">Critical Care Medicine</MenuItem>
  <MenuItem value="Emergency Medicine">Emergency Medicine</MenuItem>
  <MenuItem value="Pain Medicine">Pain Medicine</MenuItem>
  <MenuItem value="Palliative Care">Palliative Care</MenuItem>

  <MenuItem disabled>— Pediatrics & Women's Health —</MenuItem>
  <MenuItem value="Pediatrics">Pediatrics</MenuItem>
  <MenuItem value="Obstetrics and Gynecology">Obstetrics and Gynecology</MenuItem>
  <MenuItem value="Reproductive Medicine / IVF">Reproductive Medicine / IVF</MenuItem>
  <MenuItem value="Neonatology">Neonatology</MenuItem>

  <MenuItem disabled>— Super Specialties —</MenuItem>
  <MenuItem value="Oncology">Oncology</MenuItem>
  <MenuItem value="Neurology">Neurology</MenuItem>
  <MenuItem value="Dermatology">Dermatology</MenuItem>
  <MenuItem value="Psychiatry">Psychiatry</MenuItem>
  <MenuItem value="Ophthalmology">Ophthalmology</MenuItem>
  <MenuItem value="Geriatric Medicine">Geriatric Medicine</MenuItem>

  <MenuItem disabled>— Public Health & Research —</MenuItem>
  <MenuItem value="Community Medicine">Community Medicine</MenuItem>
  <MenuItem value="Public Health (MPH)">Public Health (MPH)</MenuItem>
  <MenuItem value="Epidemiology">Epidemiology</MenuItem>
  <MenuItem value="Occupational Medicine">Occupational Medicine</MenuItem>
  <MenuItem value="Forensic Medicine">Forensic Medicine</MenuItem>
  <MenuItem value="Medical Education">Medical Education</MenuItem>

  <MenuItem disabled>— Degrees & Qualifications —</MenuItem>
  <MenuItem value="MBBS">MBBS</MenuItem>
  <MenuItem value="MD (Doctor of Medicine)">MD (Doctor of Medicine)</MenuItem>
  <MenuItem value="MS (Master of Surgery)">MS (Master of Surgery)</MenuItem>
  <MenuItem value="DM (Doctorate of Medicine)">DM (Doctorate of Medicine)</MenuItem>
  <MenuItem value="MCh (Master of Chirurgiae)">MCh (Master of Chirurgiae)</MenuItem>
  <MenuItem value="DNB (Diplomate of National Board)">DNB (Diplomate of National Board)</MenuItem>
  <MenuItem value="DO (Diploma in Ophthalmology)">DO (Diploma in Ophthalmology)</MenuItem>
  <MenuItem value="DGO (Diploma in Gynecology & Obstetrics)">DGO (Diploma in Gynecology & Obstetrics)</MenuItem>
  <MenuItem value="DPH (Diploma in Public Health)">DPH (Diploma in Public Health)</MenuItem>
  <MenuItem value="DMRD (Diploma in Radiology)">DMRD (Diploma in Radiology)</MenuItem>
  <MenuItem value="M.D.S (Master of Dental Surgery)">M.D.S (Master of Dental Surgery)</MenuItem>
  <MenuItem value="PhD (Doctor of Philosophy)">PhD (Doctor of Philosophy)</MenuItem>
</TextField>


          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{ mt: 3, py: 1 }}
          >
            Submit. {sucess &&!loading && " Doctor Added Successfully"} { !sucess&&!loading && error&&" Failed to add Doctor"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
