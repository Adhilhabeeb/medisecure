"use client";
import { Authcontext } from "@/Componenets/Authpassing";
import React, { useContext, useEffect, useState, useTransition } from "react";
import {
  query,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/firebase";
import { makecontract } from "@/walletconnect/Contract";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  CircularProgress,
  Box,
  Typography,
  Card,
  CardContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
} from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";
import { getreports } from "@/Componenets/getreports";

function ImageCard({ path }) {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3 }}
      style={{
        display: "inline-block",
        margin: "6px",
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
      }}
    >
      <Image
        src={path}
        width={80}
        height={80}
        alt="Report"
        style={{ objectFit: "cover", borderRadius: "10px" }}
      />
    </motion.div>
  );
}

function Page() {
  const [reports, setreports] = useState([]);
  const [transition, startTransition] = useTransition();
  const [mycontract, setmycontract] = useState(null);
  const [multipleusers, setmultipleusers] = useState([]);
  const { userdetails, loading } = useContext(Authcontext);
  const [selected, setselected] = useState("");
  const [userpatientexist, setuserpatientexist] = useState(false);
  const [fechedpatinetarray, setfechedpatinetarray] = useState([]);
const [error, seterror] = useState(null)
  useEffect(() => {
    function starterfunc() {

      if (userdetails && fechedpatinetarray.length > 0 && mycontract) {
        const { email } = userdetails;
        const patinetfetch = fechedpatinetarray.filter((el) => el.email === email);
        console.log(patinetfetch,"isnte patinetfetch")
        if (patinetfetch.length>0) {
          
        
        const toname =
          selected.trim() !== ""
            ? patinetfetch.filter((el) => el.hospitalname === selected)[0]?.name
            : patinetfetch[0]?.name;

        if (selected.trim() === "") setselected(patinetfetch[0]?.hospitalname);

        if (patinetfetch.length > 1 && !multipleusers.length > 0)
          setmultipleusers(patinetfetch);

        async function checkUserEmail(name) {
          const hospitalname =
            selected.trim() !== ""
              ? patinetfetch.filter((el) => el.hospitalname === selected)[0]?.hospitalname
              : patinetfetch[0]?.hospitalname;

               const reportsData = await getreports({ name: toname, hospitalname });

            console.log(reportsData,"is the freorur datvss d")
            setreports(reportsData);
          try {
            const userExists = await mycontract?.getuseremial(name);
            setuserpatientexist(!!userExists);

           
          } catch (err) {
            console.log("Error fetching user email:", err);
            setuserpatientexist(false);
          }
        }
        checkUserEmail(toname);
      }else{
seterror("You are not found in any hospitals")

      }
      }
    }
    startTransition(starterfunc);
  }, [userdetails, fechedpatinetarray, mycontract, selected]);

  useEffect(() => {
    async function patientusersfetch() {
      const q = query(collection(db, "patinetuser"));
      onSnapshot(q, (querySnapshot) => {
        let fetched = [];
        querySnapshot.forEach((doc) => fetched.push({ ...doc.data(), id: doc.id }));
        const sorted = fetched.sort((a, b) => a.createdAt - b.createdAt);
        setfechedpatinetarray(sorted);
      });

      const contract = await makecontract();
      if (contract) setmycontract(contract);
    }

    patientusersfetch();
  }, []);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
        <CircularProgress />
      </Box>
    );

   
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #e0f7fa 0%, #f0f4ff 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 1,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          width: "90%",
          height: "auto",
          
        }}
      >
        <Paper
          sx={{
            backdropFilter: "blur(15px)",
            backgroundColor: "rgba(255,255,255,0.75)",
            borderRadius: "20px",
            boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
            p: 4,
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="h4"
              textAlign="center"
              fontWeight={700}
              color="primary"
              gutterBottom
            >
              Patient Medical Reports
            </Typography>

            <Typography
              textAlign="center"
              color="text.secondary"
              sx={{ mb: 3 }}
            >
              View and manage your hospital-issued reports in a smooth, modern interface
            </Typography>

            <Divider sx={{ mb: 3 }} />

            <Box textAlign="center"  mb={3}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
               {!transition?<Button loading={transition}
                  variant={userpatientexist ? "contained" : "outlined"}
                  color={userpatientexist ? "success" : "error"}
                  sx={{
                    px: 4,
                    py: 1,
                    fontWeight: 600,
                    borderRadius: 3,
                    textTransform: "capitalize",
                  }}
                >
                  {userpatientexist ? "User Found" : "User Not Found plz active it "}
                </Button>:<Button size="small">

                  <CircularProgress/>
                  </Button>}
              </motion.div>
            </Box>

            {multipleusers.length > 0 && (
              <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel id="hospital-select-label">
                  Select Hospital
                </InputLabel>
                <Select
                  labelId="hospital-select-label"
                  value={selected}
                  label="Select Hospital"
                  onChange={(e) => setselected(e.target.value)}
                  sx={{ borderRadius: 3, backgroundColor: "#fff" }}
                >
                  {multipleusers.map(({ hospitalname }, index) => (
                    <MenuItem key={index} value={hospitalname}>
                      {hospitalname}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            {reports.length > 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <TableContainer
                  component={Paper}
                  sx={{
                    borderRadius: 4,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    overflow: "hidden",
                  }}
                >
                  <Table>
                    <TableHead sx={{ backgroundColor: "#1976d2" }}>
                      <TableRow>
                        {["Date", "Doctor", "Specialization", "Reports", "Medicines"].map(
                          (head, i) => (
                            <TableCell
                              key={i}
                              align="center"
                              sx={{ color: "#fff", fontWeight: 600 }}
                            >
                              {head}
                            </TableCell>
                          )
                        )}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {reports.map(
                        ({ date, doctername, docterspecilist, imagepath, medicines }, i) => (
                          <motion.tr
                            key={i}
                            whileHover={{ backgroundColor: "#f9f9ff" }}
                            transition={{ duration: 0.3 }}
                            style={{ cursor: "pointer" }}
                          >
                            <TableCell align="center">{date}</TableCell>
                            <TableCell align="center">{doctername}</TableCell>
                            <TableCell align="center">{docterspecilist}</TableCell>
                            <TableCell align="center">
                              {imagepath?.length > 0 ? (
                                imagepath.map((el, idx) => (
                                  <ImageCard key={idx} path={el} />
                                ))
                              ) : (
                                <Typography variant="body2" color="text.secondary">
                                  No Images
                                </Typography>
                              )}
                            </TableCell>
                            <TableCell align="center">
                              {medicines?.length > 0 ? (
                                medicines.map((m, idx) => (
                                  <Typography
                                    key={idx}
                                    variant="body2"
                                    sx={{ color: "#1976d2" }}
                                  >
                                    {m}
                                  </Typography>
                                ))
                              ) : (
                                <Typography variant="body2" color="text.secondary">
                                  No Medicines
                                </Typography>
                              )}
                            </TableCell>
                          </motion.tr>
                        )
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </motion.div>
            ) : (
              <Typography
                align="center"
                color="text.secondary"
                sx={{ mt: 4, fontSize: "1.1rem" }}
              >
                No reports found for this patient.
              </Typography>
            )}
          </motion.div>
        </Paper>
      </motion.div>
    </Box>
  );
}

export default Page;
