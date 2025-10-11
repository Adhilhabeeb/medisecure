"use client";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { connectWallet } from "@/walletconnect/wallectconnect";
import { contract2, contractABI2 } from "@/Abi/contracts";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";

function Signup() {
  const [message, setmessage] = useState("");
  const router = useRouter();
  const [loading, setloading] = useState(false)
  const [contract, setcontract] = useState(null);
  const [userdata, setuserdata] = useState({
    name: "",
    email: "",
    contactnum: "",
    password: "",
    ishospital: false,
    // hospitalname: "",
  });
  const fetchPost = async () => {
    return await getDocs(collection(db, "medidatabase")).then(
      (querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        return newData;
      }
    );
  };
  async function getAdmin() {
    try {
      //     // const contract = new ethers.Contract(contractAddress, contractABI, signer);

      console.log(contract, "comtact from the state ");
      console.log(
        "Methods in contract:",
        contract.interface.fragments.map((f) => f.name)
      );

      const adminAddress = await contract.getallpatientsinhospital(
        userdata.name
      );
      console.log(adminAddress);
      let gg = adminAddress.map((r, i) => {
        console.log(
          `  at index ${i}  nme :${r.name}  age : ${r.age},r.bloodgroup ,${r.bloodgroup}`
        );
        return r;
      });

      return gg;
    } catch (error) {
      console.error(error);
      return [];
    }

    // setAdmin(adminAddress);
  }

  async function handlesubmit() {
    setloading(true)
    // setcontract("")
setmessage("")
if (userdata.contactnum.length>10) {
  setmessage("invalid mobile number")
  setloading(false)
  return ;
}
    if (!userdata.email.includes("@gmail.com")) {
  setloading(false)
      setmessage("plz enter a  valid email address");
      return;
    }

    let errorfound = false;
    if (userdata.ishospital) {
      alert("hosital");
      try {
        let account = await connectWallet();
        console.log(account, "is the accountr conneted");
        let hospitalarray = await getAdmin();
        console.log(
          hospitalarray.length,
          "is thelength  and array is :",
          hospitalarray
        );

        let fetchedusers = await fetchPost();
        let isuser = fetchedusers.some((el) => {
          return el.email == userdata.email;
        });

        console.log(isuser, "and the userano", userdata.email);
        if (hospitalarray.length > 0 || isuser) {
          alert("user already exist use any other usr nsme   ");
          setmessage(
            "user already exist try any othername or include symbals  "
          );
  setloading(false)


 

          const query = new URLSearchParams(userdata).toString();
          console.log(query,"isythebequiertyy")
          router.push(`/signin?${query}`);
        } else {
        

          if (userdata.ishospital) {
            alert("illatha hospitaluser");
         
             console.log(contract, "comtact on when no  hospital nmed nby this ");
      console.log(
        "Methods in contract: on no hospital found",
        contract.interface.fragments.map((f) => f.name)
      );

               try {
                const addcontract = await contract.Addhospital(userdata.name);
              console.log(contract ,"is tghe contrac  when addig hospital ",userdata.name)
              if (addcontract.gasPrice) {
alert("sucessin adding hospital")

                        const docRef = await addDoc(collection(db, "medidatabase"), userdata);
                        console.log("Document written with ID: ", docRef.id);
  setloading(false)
            
 const query = new URLSearchParams(userdata).toString();
        console.log(query,"isythebequiertyy")
        router.push(`/signin?${query}`);

                    
              }else{
alert("not sucess")
  setloading(false)

                setmessage("transaction not complete ")
              }

               } catch (error) {
  setloading(false)

                setmessage("transaction not complete ")

                console.log(error,"addcontract error ",)
               }
          }
          // console.log("no us4r od the ","and")
        }
      } catch (error) {
  setloading(false)

        console.log(error, "is the eror ");

      }
    } else {
      alert("normaluser");
      let fetchedusers = await fetchPost();
      let isuser = fetchedusers.some((el) => {
        return el.email == userdata.email;
      });

      if (!isuser) {
       
            try {
                    const docRef = await addDoc(collection(db, "medidatabase"), {
                        name:userdata.name,
            email: userdata.email,
            contactnum: userdata.contactnum,
            password: userdata.password,
            ishospital: false,
            // hospitalname: "",
                    });
                    console.log("Document written with ID: ", docRef.id);
                    alert(docRef.id)
  setloading(false)

        const query = new URLSearchParams(userdata).toString();
        console.log(query,"isythebequiertyy")
        router.push(`/signin?${query}`);
                  } catch (e) {
                    console.error("Error adding document: ", e);
                  }
      } else {
        alert("the normal use already exist");
        setmessage("the  user already exist  plz sign in   ");
  setloading(false)

        const query = new URLSearchParams(userdata).toString();
        console.log(query,"isythebequiertyy")
        router.push(`/signin?${query}`);
      }
    }
  }
  function handleChange(e) {
    setuserdata((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  useEffect(() => {
    console.log(message, "messshgae updated");
  }, [message]);

  useEffect(() => {
    async function makecontract(params) {
      try {
        if (!window.ethereum) return alert("MetaMask not found!");
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        console.log(signer, "si teh signer");

        console.log(userdata.name, "Addmmdmd");

        //     // const contract = new ethers.Contract(contractAddress, contractABI, signer);
        const contract = new ethers.Contract(contract2, contractABI2, signer);

        console.log(contract, "called in fisrst moint ");
        setcontract(contract);
        return contract;
      } catch (error) {
        console.error(error, "  erroror in calling the contract   ");
      }
    }
    makecontract();
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
      <Paper elevation={3} sx={{ p: 4, width: 400, borderRadius: 3 }}>
        <Typography variant="h5" textAlign="center" gutterBottom>
          Sign Up
        </Typography>

        {/* Name */}
        <TextField
          fullWidth
          label={
            userdata.ishospital ? "enter hoispital name" : " enter username"
          }
          name="name"
          variant="outlined"
          margin="normal"
          value={userdata.name}
          onChange={handleChange}
        />

        {/* Email */}
        <TextField
          fullWidth
          label={userdata.ishospital ? "enter hoispital email" : " enter email"}
          name="email"
          type="email"
          variant="outlined"
          margin="normal"
          value={userdata.email}
          onChange={handleChange}
        />

        {/* Contact Number */}
        <TextField
          fullWidth
          label={
            userdata.ishospital
              ? "enter hoispital contactnum"
              : " enter contactnumber"
          }
          name="contactnum"
          type="number"
          variant="outlined"
          margin="normal"
          value={userdata.contactnum}
          onChange={handleChange}
        />

        {/* Password */}
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          margin="normal"
          value={userdata.password}
          onChange={handleChange}
        />

        {/* Checkbox for Hospital */}
        {message && (
          <Typography color="red" variant="caption" component={"p"}>
            {message}
          </Typography>
        )}
        <FormControlLabel
          control={
            <Checkbox
              checked={userdata.ishospital}
              onChange={() =>
                setuserdata((prev) => ({
                  ...prev,
                  ishospital: !prev.ishospital,
                }))
              }
            />
          }
          label="Registering as a Hospital?"
        />

        {/* Hospital Name (only when ishospital is true) */}
        {/* {userdata.ishospital && (
          <TextField
            fullWidth
            label="Hospital Name"
            name="hospitalname"
            variant="outlined"
            margin="normal"
            value={userdata.hospitalname}
            onChange={handleChange}
          />
        )} */}

        {/* Submit Button */}
        <Button disabled={loading}
          onClick={handlesubmit}
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2, borderRadius: 2 }}
        >
          Sign Up
        </Button>

        <Box display={"flex"} mt={2}>
          <Typography
            component={"caption"}
            variant="caption"
            display={"inline"}
            color="primary"
          >
            you already have an account
          </Typography>
          <Link href={"/signin"}>
            <Typography
              component={"p"}
              color="Darkblue"
              ml={2}
              fontSize={"small"}
            >
              Sign in
            </Typography>
          </Link>
        </Box>
      </Paper>
    </Box>
  );
}

export default Signup;
