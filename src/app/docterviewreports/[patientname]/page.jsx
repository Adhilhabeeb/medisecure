"use client";
 import triggerWorkflow  from "../../actions/trigger.action"
import { fetchdoctores } from "@/Componenets/docter/addpatinettodocter";
import { getpatientdetails } from "@/Componenets/getpatientdetails";
import { useParams, useSearchParams } from "next/navigation";
import React, { Suspense, useContext, useEffect, useState } from "react";
import { Authcontext } from "@/Componenets/Authpassing";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// ✅ Material UI Imports
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Divider,
  CardMedia,
  Chip,
  Button,
  TextField,
} from "@mui/material";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase";

function Page() {
    let paramssearch=useSearchParams()
// alert(paramssearch.get("docteremailpass"))
let docteremailpass=paramssearch.get("docteremailpass")
  const params = useParams();
  let { userdetails } = useContext(Authcontext);
  const { patientname } = params;
  const [patiendee, setpatiende] = useState(null);
const [showdocters, setshowdocters] = useState(false)
const [docters, setdocters] = useState([])
const [docterreviewofpatient, setdocterreviewofpatient] = useState("")
const [doctertosharereport, setdoctertosharereport] = useState([])
  useEffect(() => {
    async function fetchuserreports() {
      let docter = await fetchdoctores();
      let { email } = userdetails;
      let otherdocters = docter.filter((el) => el.docteremail != email);
      console.log(otherdocters,"is the otehrrdocters")
setdocters(docter)
      if (docter?.length > 0) {


if (docteremailpass) {


  let docterar = docter.find((el) => el.docteremail === docteremailpass );
     let patinetdetails = docterar?.patinets?.find(
          (el) => el.name === patientname
        );

        if (!patinetdetails) return;

        let reportss = await getpatientdetails(patinetdetails);
        let patientreports = reportss?.reports?.filter(
          (el) => el.doctername === docterar.doctername
        );

        reportss.reports = patientreports;
        setpatiende(reportss);



}else{
   let docterar = docter.find((el) => el.docteremail === email );
        let patinetdetails = docterar?.patinets?.find(
          (el) => el.name === patientname
        );

        if (!patinetdetails) return;

        let reportss = await getpatientdetails(patinetdetails);
        let patientreports = reportss?.reports?.filter(
          (el) => el.doctername === docterar.doctername
        );

        reportss.reports = patientreports;
        setpatiende(reportss);
}
 }
    }

 if(userdetails )    fetchuserreports();
  }, [userdetails]);
  useEffect(() => {
    // Listen to the entire "users" collection
     
    const unsub = onSnapshot(collection(db, "Docters"), (snapshot) => {
      const usersArray = snapshot.docs.map((doc) => ({
        id: doc.id,        // document ID
        ...doc.data(),     // document data
      }));
      setdocters(usersArray);
    });

    // Cleanup when the component unmounts
    return () => unsub();
  }, []);
return (
  <Box sx={{ p: 4, backgroundColor: "#f5f7fa", minHeight: "100vh" }}>
    <Typography variant="h4" fontWeight={600} gutterBottom>
      Doctor's Patient Report
    </Typography>

    {patiendee ? (
      <Grid container spacing={4}>
        {/* ✅ Patient Details Card */}
        <Grid item xs={12} md={5}>
          <Card sx={{ boxShadow: 4, borderRadius: 3, p: 2 }}>
            <CardContent>
              <Typography variant="h6" color="primary" fontWeight={600}>
                Patient Details
              </Typography>
              <Divider sx={{ my: 2 }} />

              <Grid container spacing={2}>
                {Object.entries(patiendee.patientde).map(([key, value]) => (
                  <Grid item xs={12} sm={6} key={key}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {key.charAt(0).toUpperCase() + key.slice(1)}:
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {value}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* ✅ Reports Section */}
        <Grid item xs={12} md={7}>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Reports
          </Typography>

          {patiendee.reports?.length > 0 ? (
            <Grid container spacing={3}>
              {patiendee.reports.map((el, index) => (
                <Grid item xs={12} key={index}>
                  <Card sx={{ boxShadow: 3, borderRadius: 3, p: 2 }}>
                    <CardContent>
                      <Typography variant="subtitle1" fontWeight={600}>
                        📅 Report Date: {el.date}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Doctor:</strong> {el.doctername} ({el.docterspecilist})
                      </Typography>

                      {/* ✅ Images */}
                      {el.imagepath?.length > 0 && (
                        <Grid container spacing={2}>
                          {el.imagepath.map((img, i) => (
                            <Grid item xs={12} sm={6} key={i}>
                              <CardMedia
                                component="img"
                                image={img}
                                alt="Report Image"
                                sx={{
                                  height: 150,
                                  borderRadius: 2,
                                  objectFit: "cover",
                                  boxShadow: 2,
                                }}
                              />
                            </Grid>
                          ))}
                        </Grid>
                      )}

                      {/* ✅ Medicine List */}
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="body2" fontWeight={600} mb={1}>
                          💊 Medicines:
                        </Typography>
                        {el.medicines?.length > 0 ? (
                          el.medicines.map((med, i) => (
                            <Chip
                              key={i}
                              label={med}
                              sx={{ mr: 1, mb: 1 }}
                              color="primary"
                              variant="outlined"
                            />
                          ))
                        ) : (
                          <Typography variant="body2" color="text.secondary">
                            No medicines prescribed.
                          </Typography>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}

              {/* ✅ Share Report Button */}
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2, borderRadius: 3, textTransform: "none", boxShadow: 3 }}
                  onClick={() => setshowdocters(!showdocters)}
                >
                  Share Report
                </Button>
              </Grid>

              {/* ✅ Choose Doctors & Add Review */}
              {showdocters && (
                <Grid item xs={12}>
                  <Card sx={{ p: 3, boxShadow: 3, borderRadius: 3 }}>
                    <Typography variant="h6" fontWeight={600} mb={2}>
                      Select Doctors to Share Report
                    </Typography>
                    <FormGroup>
                      {docters?.map((el, ind) => (
                        <FormControlLabel
                          key={ind}
                          control={
                            <Checkbox
                              onChange={() =>
                                setdoctertosharereport((prev) =>
                                  prev.includes(el.createdAt.toString())
                                    ? prev.filter((id) => id !== el.createdAt.toString())
                                    : [...prev, el.createdAt.toString()]
                                )
                              }
                            />
                          }
                          label={el.docteremail}
                        />
                      ))}
                    </FormGroup>

                    {/* ✅ Input Doctor Review */}
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      label="Doctor's Review"
                      value={docterreviewofpatient}
                      onChange={(e) => setdocterreviewofpatient(e.target.value)}
                      sx={{ mt: 2 }}
                    />

                    {/* ✅ Share Button */}
                    <Button
                      variant="contained"
                      color="success"
                      sx={{ mt: 2, borderRadius: 3, textTransform: "none" }}
                      onClick={async () =>
                        await triggerWorkflow(doctertosharereport, patientname, userdetails, docterreviewofpatient)
                      }
                    >
                      Share Report Now
                    </Button>
                  </Card>
                </Grid>
              )}
            </Grid>
          ) : (
            <Typography>No reports found.</Typography>
          )}
        </Grid>
      </Grid>
    ) : (
      <Typography>Loading...</Typography>
    )}
  </Box>
);

}

export default function name() {
  return <Suspense fallback={<div>Loading...</div>}>
    <Page/>
  </Suspense>
};
