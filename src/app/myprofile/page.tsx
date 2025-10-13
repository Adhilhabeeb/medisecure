"use client";
import { Authcontext } from "@/Componenets/Authpassing";
import React, {
  useContext,
  useEffect,
  useState,
  useTransition,
  useRef,
} from "react";
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
} from "@mui/material";
import { LocalHospital, Verified, PauseCircle, PlayCircle } from "@mui/icons-material";

function Myprofile() {
  const context = useContext(Authcontext);
  const [hospitalworkingloading, starthospitalworking] = useTransition();
  const [hospitalwoking, sethospitalwoking] = useState(false);
  const [mycontract, setmycontract] = useState<Contract | null>(null);
  const [loading, startloading] = useTransition();
  const isMounted = useRef(false);

  // Fetch Contract Instance
  useEffect(() => {
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
  const entries = Object.entries(userdetails).filter(([key]) => key !== "ishospital");

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
                Welcome back, {userdetails.name || "User"}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* User details */}
          <Grid container spacing={3}>
            {entries.map(([name, value]) => (
              <Grid item xs={12} sm={6} key={name}>
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
