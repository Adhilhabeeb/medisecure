"use client";
import { useSearchParams } from "next/navigation";
import { Emailsenter } from "@/Componenets/Hospital/mailsent";
import { getpatientdetails } from "@/Componenets/getpatientdetails";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Grid,
  ImageList,
  ImageListItem,
  Typography,
  Chip,
  Stack,
} from "@mui/material";
import { useEffect, useLayoutEffect, useState, useTransition } from "react";

export default function PatientDetails() {
  const [isPending, startTransition] = useTransition();
  const searchparams = useSearchParams();
  const name = searchparams.get("uname") ?? "";
  const [index, setIndex] = useState(null);
  const [patientdetails, setPatientdetails] = useState(null);
  const [message, setMessage] = useState(null);
  const [reports, setReports] = useState([]);

  async function getPatient() {
    startTransition(async () => {
      const patinet = await getpatientdetails({
        name,
        hospitalname: JSON.parse(localStorage.getItem("medisecureuser")).name,
      });

      const { patientde, message, reports } = patinet;
      if (reports?.length > 0) setReports(reports);
      if (message) setMessage(message);
      setPatientdetails(patientde);
    });
  }

  useLayoutEffect(() => {
    getPatient();
  }, []);

  return (
    <Box sx={{ p: 4, maxWidth: "900px", mx: "auto" }}>
      {/* Loader */}
      {isPending && (
        <Box display="flex" justifyContent="center" alignItems="center" py={6}>
          <CircularProgress color="primary" />
        </Box>
      )}

      {/* Message */}
      {message && (
        <Typography color="error" textAlign="center" sx={{ mb: 3 }}>
          {message}
        </Typography>
      )}

      {/* Patient Details */}
      {!isPending && patientdetails && (
        <Card
          variant="outlined"
          sx={{
            mb: 4,
            borderRadius: 3,
            boxShadow: 2,
            background: "#fafafa",
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              fontWeight={600}
              gutterBottom
              color="primary"
            >
              Patient Details
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              {Object.entries(patientdetails).map(([key, value]) => (
                <Grid item xs={12} sm={6} key={key}>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
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
      )}

      {/* Reports */}
      {reports.length > 0 && 
      (
        <>
          <Typography variant="h5" color="primary" gutterBottom>
            Reports
          </Typography>

          <Stack spacing={3}>
            {reports.map(
              ({ date, doctername, docterspecilist, imagepath, medicines }, ind) => (
                <Card
                  key={ind}
                  variant="outlined"
                  sx={{
                    borderRadius: 3,
                    boxShadow: 1,
                    background: "#fff",
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      gutterBottom
                    >
                      Report {ind + 1}
                    </Typography>

                    <Divider sx={{ mb: 2 }} />

                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body1">
                          <strong>Date:</strong> {date}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body1">
                          <strong>Doctor Name:</strong> {doctername}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body1">
                          <strong>Specialist:</strong> {docterspecilist}
                        </Typography>
                      </Grid>
                    </Grid>

                    <Box mt={2}>
                      <Button   sx={{
                        color : !imagepath.length>0? "red":"primary",
          border:  !imagepath.length>0? "1px solid":"primary",
          background:  !imagepath.length>0? "white":"primary",
          borderColor:!imagepath.length>0? "red":"primary"
                      }}
                        variant="contained"
                        size="small"
                        onClick={() => {
                          setIndex((prev) => (prev === ind ? null : ind));
                        }}
                      >


                        { imagepath.length>0?index === ind ? "Hide Images" : "Show Images":"no images found"}
                      </Button>

                      {/* {!imagepath.length>0&& <Typography >
                        no images found</Typography>} */}
                    </Box>

                    {/* Image List */}
                    {index === ind && imagepath?.length > 0 && (
                      <ImageList
                        sx={{ width: "100%", mt: 2 }}
                        cols={2}
                        rowHeight={160}
                      >
                        {imagepath.map((item, i) => (
                          <ImageListItem key={i}>
                            <img
                              src={item}
                              alt={`report-${i}`}
                              loading="lazy"
                              style={{
                                borderRadius: "10px",
                                objectFit: "cover",
                              }}
                            />
                          </ImageListItem>
                        ))}
                      </ImageList>
                    )}

                    {/* Medicines */}
                    {medicines?.length > 0 ? (
                      <Box mt={2}>
                        <Typography variant="body1" fontWeight={600}>
                          Medicines:
                        </Typography>
                        <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
                          {medicines.map((el, i) => (
                            <Chip key={i} label={el} color="secondary" />
                          ))}
                        </Stack>
                      </Box>
                    ) :<Typography  >

                      no medicines
                      </Typography>}
                  </CardContent>
                </Card>
              )
            )}
          </Stack>
        </>
      )
     
      }

      {!isPending  && !reports.length>0 && <Button  fullWidth >No Reporst Found </Button>}
      
    </Box>
  );
}
