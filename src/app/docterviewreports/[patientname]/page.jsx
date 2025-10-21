"use client";

import { fetchdoctores } from "@/Componenets/docter/addpatinettodocter";
import { getpatientdetails } from "@/Componenets/getpatientdetails";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { Authcontext } from "@/Componenets/Authpassing";

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
} from "@mui/material";

function Page() {
  const params = useParams();
  let { userdetails } = useContext(Authcontext);
  const { patientname } = params;
  const [patiendee, setpatiende] = useState(null);

  useEffect(() => {
    async function fetchuserreports() {
      let docter = await fetchdoctores();
      let { email } = userdetails;

      if (docter?.length > 0) {
        let docterar = docter.find((el) => el.docteremail === email);
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

    fetchuserreports();
  }, [userdetails]);

  return (
    <Box sx={{ p: 3, background: "#f5f7fa", minHeight: "100vh" }}>
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Doctor's Patient Report
      </Typography>

      {patiendee ? (
        <Grid container spacing={3}>
          {/* ✅ Patient Details Card */}
          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" color="primary">
                  Patient Details
                </Typography>
                <Divider sx={{ my: 1 }} />

                {/* <Typography><strong>Name:</strong> {patiendee.patientde.name}</Typography>
                <Typography><strong>Age:</strong> {patiendee.patientde.age}</Typography>
                <Typography><strong>Blood Group:</strong> {patiendee.patientde.bloodgroup}</Typography>
                <Typography><strong>Contact:</strong> {patiendee.patientde.contact}</Typography>
                <Typography><strong>Email:</strong> {patiendee.patientde.email}</Typography>
                <Typography><strong>Hospital:</strong> {patiendee.patientde.hospitalname}</Typography> */}
                 {Object.entries(patiendee.patientde).map(([key, value]) => (
                <Grid item xs={12} sm={6} key={key}>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}:
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {value}
                  </Typography>
                </Grid>
              ))}
              </CardContent>
            </Card>
          </Grid>

          {/* ✅ Reports Section */}
          <Grid item xs={12}>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              Reports
            </Typography>

            {patiendee.reports?.length > 0 ? (
              <Grid container spacing={3}>
                {patiendee.reports.map((el, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Card sx={{ p: 2, boxShadow: 2, borderRadius: 2 }}>
                      <CardContent>
                        <Typography variant="subtitle1" fontWeight={600}>
                          Report Date: {el.date}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Doctor:</strong> {el.doctername} (
                          {el.docterspecilist})
                        </Typography>

                        {/* ✅ Images */}
                        {el.imagepath?.length > 0 && (
                          <Box sx={{ mt: 1 }}>
                            {el.imagepath.map((img, i) => (
                              <CardMedia
                                key={i}
                                component="img"
                                image={img}
                                alt="report"
                                sx={{
                                  height: 140,
                                  borderRadius: 2,
                                  objectFit: "cover",
                                  mb: 1,
                                }}
                              />
                            ))}
                          </Box>
                        )}

                        {/* ✅ Medicines */}
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="body2" mb={1}>
                            <strong>Medicines:</strong>
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
                            <Typography>No Medicines</Typography>
                          )}
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
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

export default Page;
