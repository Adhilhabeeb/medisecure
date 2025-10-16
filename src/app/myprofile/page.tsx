"use client";
import { Authcontext } from "@/Componenets/Authpassing";
import React, {
  useContext,
  useEffect,
  useState,
  useTransition,
  useRef,
} from "react";
import {
  query,
  collection,
  onSnapshot,
  DocumentData,
} from "firebase/firestore";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { makecontract } from "@/walletconnect/Contract";
import { Contract } from "ethers";
import {
  Container,
  Paper,
  Typography,
  Button,
  Grid,
  CircularProgress,
  Divider,
  Box,
  Avatar,
  Fade,
  TextField,
} from "@mui/material";
import { LocalHospital, Verified, PauseCircle, PlayCircle } from "@mui/icons-material";
import { db } from "@/firebase";

function Myprofile() {
    let [useractive,startusersctive]= useTransition()
  const context = useContext(Authcontext);
  const [hospitalworkingloading, starthospitalworking] = useTransition();
  const [hospitalwoking, sethospitalwoking] = useState(false);
  const [mycontract, setmycontract] = useState<Contract | null>(null);
  const [loading, startloading] = useTransition();
  const isMounted = useRef(false);
  const [selectedHospital, setSelectedHospital] = React.useState("");



  


  
  const [multiplehospitalos, setmultiplehospitalos] = useState<any[]>([])
let emailhospitalinput=useRef<HTMLInputElement |undefined>(undefined)
  const [emailhospitalname, setemailhospitalname] = useState("")
const [userexust, setuserexust] = useState(false)
const [showactiveform, setshowactiveform] = useState(false)
const [fechedpatinetarray, setfechedpatinetarray] = useState<DocumentData[]> ([])
const [userpatientexist, setuserpatientexist] = useState(false)
const [userhosname, setuserhosname] = useState<string|null>(null)


useEffect(() => {
    setshowactiveform(false)
  if (
    fechedpatinetarray.length > 0 &&
    mycontract &&
    context?.userdetails &&
    selectedHospital.trim() !== ""
  ) {
    const patientArray = fechedpatinetarray.filter(
      ({ email }) => email === context.userdetails?.email
    );

    const selected = patientArray.find(
      ({ hospitalname }) => hospitalname === selectedHospital
    );

    if (!selected) {
      console.log("No matching patient found for selected hospital");
      return;
    }

        setuserhosname(selected.name);

    async function checkUserEmail(name:string) {
      try {
        const userExists = await mycontract?.getuseremial(name);
        console.log("userExists:", userExists);
      

        if (userExists) {
          setuserpatientexist(userExists);
        } else {
          setuserpatientexist(false);
        }
      } catch (err:any) {
        console.log("Error fetching user email:", err?.reason);
        setuserpatientexist(false);
      }
    }

    checkUserEmail(selected.name);
  }
}, [fechedpatinetarray, mycontract, context?.userdetails, selectedHospital]);


  

 async function patientusersfetch() {
      const q = query(collection(db, "patinetuser"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let  fetched :DocumentData[]= [];
        querySnapshot.forEach((doc) => {
          fetched.push({ ...doc.data(), id: doc.id });
        });
        const sorted = fetched.sort((a, b) => a.createdAt - b.createdAt);
    setfechedpatinetarray(sorted)
    console.log("updted the fetchpat",fechedpatinetarray)
      });
}


useEffect(() => {
 console.log(multiplehospitalos,"is ythe multiple hosylsss")
}, [multiplehospitalos])


useEffect(() => {

async function checkuser() {
    if (fechedpatinetarray.length>0 && mycontract && context?.userdetails) {
    if (fechedpatinetarray.some(({name,email})=>email==context.userdetails?.email)) {
      console.log(fechedpatinetarray.filter(({name,email})=>email==context.userdetails?.email),"is the patinet filtererd array")
      let patinetarray=fechedpatinetarray.filter(({name,email})=>email==context.userdetails?.email)
      if (patinetarray.length>1) {
      setmultiplehospitalos(patinetarray.map((el)=>el.hospitalname))
        
        
  let tofiltervalue=selectedHospital.trim()!=""?selectedHospital:patinetarray.map((el)=>el.hospitalname)[0]
  setSelectedHospital(tofiltervalue)
  console.log(tofiltervalue,"ytpfiktervakye")
        let filterername=patinetarray.filter(({name,email,hospitalname})=>hospitalname== tofiltervalue)[0]?.name
console.log(filterername,"is the filterer name",patinetarray)
try {

  console.log("name :",filterername)
  let userisloginer= await mycontract.users(filterername)
  if (userisloginer[1]) {
    setuserhosname(filterername)
console.log("namefiltered",filterername,userisloginer,"isslslls")
setuserpatientexist(userisloginer[1])
  }


} catch (error:any) {
setuserpatientexist(false)

  console.log(error.reason,"si the rror in the fuiiterrr")
}
      }else{
        let fikteredpatinetname=fechedpatinetarray.filter(({name,email})=>email==context.userdetails?.email)[0].name
try {
  let userisloginer= await mycontract.getuseremial(fikteredpatinetname)
  setuserhosname(fikteredpatinetname)
console.log("namefiltered",fikteredpatinetname,userisloginer,"isslslls")
setuserpatientexist(userisloginer)

} catch (error:any) {
setuserpatientexist(false)

  console.log(error.reason,"si the rror in the fuiiterrr")
}
      }
 



}
 
}

}
    if (fechedpatinetarray.length>0 && mycontract && context?.userdetails && !context.userdetails.ishospital) {
startusersctive(checkuser)
    }
}, [fechedpatinetarray,context,mycontract])

   async  function handleactiveaccont() {


if (emailhospitalname.trim()=="") {
// emailhospitalinput.current?.placeholder="plz enter the hospitalname";
  return;
}

if (context?.userdetails && mycontract) {
  console.log(context.userdetails,mycontract,"emial:",context.userdetails?.email,"Amnd d d hosoyal name")
let {
  contactnum,
  email,
  id,
  ishospital,
  name,
  password,
} = context.userdetails;
  await patientusersfetch()


  async function adduyser() {
    if (!context || !mycontract) {
      return ;
    }
  if (fechedpatinetarray.some(({name,email})=>email==context.userdetails?.email)) {
  let patinetarray=fechedpatinetarray.filter(({name,email})=>email==context.userdetails?.email)
      if (patinetarray.length>1) {
  let tofiltervalue=selectedHospital.trim()!=""?selectedHospital:patinetarray.map((el)=>el.hospitalname)[0]

 let filterername=patinetarray.filter(({name,email,hospitalname})=>hospitalname== tofiltervalue)[0]?.name

let createpatinetaccount= await mycontract.createpatientaccount(filterername,emailhospitalname,email,contactnum)

if (createpatinetaccount.gasPrice) {
  setuserpatientexist(true)
  setuserhosname(filterername)
  setshowactiveform(false)
}

       return;

      }else{

 let filteredname=fechedpatinetarray.filter(({name,email})=>email==context.userdetails?.email)[0].name
 console.log(filteredname,"is    namemme",emailhospitalname,email,contactnum)

 
let createpatinetaccount= await mycontract.createpatientaccount(filteredname,emailhospitalname,email,contactnum)

if (createpatinetaccount.gasPrice) {
  setuserpatientexist(true)
  setuserhosname(filteredname)
  setshowactiveform(false)
}
      }

}
}

startusersctive(adduyser)
  

 
console.log(fechedpatinetarray,"is patumet array")

}

    
  }

  // Fetch Contract Instance
  useEffect(() => {
    patientusersfetch()
    async function fetch() {
      const contract = await makecontract();

    
      if (contract) setmycontract(contract);


    }
    startloading(fetch);
  }, []);

  // Check Hospital Working Status
  useEffect(() => {
    async function checkHospitalWorking() {
      if (context?.userdetails && mycontract) {
        const working = await mycontract.Hospitalscurrentworking(
          context.userdetails.name
        );
        sethospitalwoking(working);
      }
    }
    starthospitalworking(checkHospitalWorking);



  }, [context, mycontract]);

  async function checkfu() {
    if (!mycontract || !context?.userdetails || loading) return;

    const isWorking = await mycontract.Hospitalscurrentworking(
      context.userdetails.name
    );

    try {
      if (isWorking) {
        const tx = await mycontract.pausehospital(context.userdetails.name);
        if (tx.gasPrice) sethospitalwoking(false);
      } else {
        const tx = await mycontract.Addhospital(context.userdetails.name);
        if (tx.gasPrice) sethospitalwoking(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (!context?.userdetails) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
        <CircularProgress />
      </Box>
    );
  }

  const { userdetails } = context;
  if (userhosname) {
    userdetails.username=userhosname
  }
  const entries = Object.entries(userdetails).filter(([key]) => key !== "ishospital"&& key!=="hospitalname");

  return (
    <Fade in>
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Paper
          elevation={6}
          sx={{
            p: 5,
            borderRadius: 5,
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(245,248,255,0.95) 100%)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
          }}
        >
          {/* Header */}
          <Box display="flex" alignItems="center" mb={3} gap={2}>
            <Avatar sx={{ bgcolor: "primary.main", width: 60, height: 60 }}>
              <LocalHospital fontSize="large" />
            </Avatar>
            <Box>
              <Typography variant="h4" fontWeight={700} color="primary">
                My Profile
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Welcome back  hello, {userdetails.name || "User"}

              </Typography>


            </Box>

            {multiplehospitalos.length>0&& <FormControl fullWidth>
      <InputLabel id="hospital-select-label">Select Hospital</InputLabel>
      <Select
        labelId="hospital-select-label"
        value={selectedHospital}
        label="Select Hospital"
        onChange={(e)=>setSelectedHospital(e.target.value)}
      >
        {multiplehospitalos.length > 0 &&
          multiplehospitalos.map((el, index) => (
            <MenuItem key={index} value={el}>
              {el}
            </MenuItem>
          ))}
      </Select>
    </FormControl>}
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* User details */}
          <Grid container spacing={3}>
            {entries.map(([name, value],ind) => (
              <Grid item xs={12} sm={6} key={ind}>
                <Paper
                  elevation={1}
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    bgcolor: "rgba(255,255,255,0.8)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                    transition: "all 0.25s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-3px)",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                    },
                  }}
                >
                  <Typography variant="subtitle2" color="text.secondary">
                    {name.toUpperCase()}
                  </Typography>
                  <Typography variant="body1" fontWeight={600} mt={0.5}>
                    {String(value)}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Hospital Status Section */}
          {!userdetails.ishospital &&<>
          <Button  variant="outlined" loading={useractive}   onClick={()=>{ if (!userpatientexist) {
            setshowactiveform(true)
          } }}>
             {userpatientexist?"userexist":"activeacoount"}
          </Button>
          </>}


          {showactiveform&&<>
          
          <TextField   placeholder="enter the hospital name that sent to your email"  value={emailhospitalname}  onChange={(e)=>setemailhospitalname(e.target.value)}/>
            <Button disabled={useractive} onClick={handleactiveaccont}> submit</Button>
          </>}
          {userdetails.ishospital && (
            <>
              <Divider sx={{ my: 4 }} />
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                gap={2}
              >
                <Typography variant="h6" color="text.secondary">
                  Hospital Status:
                </Typography>

                <Paper
                  elevation={4}
                  sx={{
                    px: 4,
                    py: 2,
                    borderRadius: 4,
                    bgcolor: hospitalwoking ? "rgba(46, 204, 113, 0.2)" : "rgba(231, 76, 60, 0.2)",
                    color: hospitalwoking ? "green" : "red",
                    fontWeight: 700,
                    textAlign: "center",
                    boxShadow: `0 0 15px ${
                      hospitalwoking ? "rgba(46,204,113,0.3)" : "rgba(231,76,60,0.3)"
                    }`,
                    transition: "all 0.3s ease",
                  }}
                >
                  {hospitalwoking ? (
                    <Verified sx={{ verticalAlign: "middle", mr: 1 }} />
                  ) : (
                    <PauseCircle sx={{ verticalAlign: "middle", mr: 1 }} />
                  )}
                  {hospitalwoking ? "Active" : "Paused"}
                </Paper>

                <Button
                  onClick={checkfu}
                  variant="contained"
                  color={hospitalwoking ? "error" : "primary"}
                  size="large"
                  disabled={hospitalworkingloading}
                  startIcon={
                    hospitalworkingloading ? (
                      <CircularProgress size={22} color="inherit" />
                    ) : hospitalwoking ? (
                      <PauseCircle />
                    ) : (
                      <PlayCircle />
                    )
                  }
                  sx={{
                    mt: 1,
                    px: 4,
                    py: 1.2,
                    borderRadius: 4,
                    textTransform: "none",
                    fontWeight: 700,
                    letterSpacing: 0.5,
                    boxShadow: 3,
                    "&:hover": {
                      transform: "scale(1.03)",
                      boxShadow: 6,
                    },
                    transition: "all 0.25s ease-in-out",
                  }}
                >
                  {hospitalwoking ? "Pause Hospital" : "Resume Hospital"}
                </Button>
              </Box>
            </>
          )}
        </Paper>
      </Container>
    </Fade>
  );
}

export default Myprofile;
