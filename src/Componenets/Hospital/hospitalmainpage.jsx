"use client";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { makecontract } from "@/walletconnect/Contract";
import {
  getallpatietarray,
  filterfromallpatients,
} from "@/Componenets/Hospital/getallpatientarray";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import { redirect, useSearchParams } from "next/navigation";
import { RemoveRedEyeRounded } from "@mui/icons-material";
export function LoadingComponet() {
  return (
    <Stack spacing={1}>
      {/* For variant="text", adjust the height via font-size */}
      <Skeleton variant="text" sx={{ fontSize: "1rem" }} />

      {/* For other variants, adjust the size with `width` and `height` */}
      {/* <Skeleton variant="circular" width={40} height={40} /> */}
      <Skeleton variant="rectangular" width={210} height={60} />
      <Skeleton variant="rounded" width={210} height={60} />
    </Stack>
  );
}
function Hospitalmainpage() {
  let searchparams = useSearchParams();
  let urlparams = new URLSearchParams(searchparams);

  const [fetching, setfetching] = useState(true);
  const [error, seterror] = useState(null);
  const [Allpatients, setAllpatients] = useState([]);
  const [contract, setcontract] = useState(null);
  const [search, setsearch] = useState("");

  useEffect(() => {
    let user = localStorage.getItem("medisecureuser");

    async function fetcontct(params) {
      let allpatients = await getallpatients();
      if (allpatients.length > 0) {
        console.log(allpatients, "is all patient in gforst load");
        setAllpatients(allpatients);
      }
    }
    fetcontct();

    return () => {
      localStorage.removeItem("mycontract");
    };
  }, []);

  async function getallpatients() {
    let user = localStorage.getItem("medisecureuser");

    if (user) {
      let hospitaldetails = JSON.parse(user);

      try {
        //startfetching
        let cont = await makecontract();

        const Allpatientsar = await cont.getallpatientsinhospital(
          hospitaldetails.name
        );
        if (Allpatientsar && !Error.isError(Allpatientsar)) {
          let gg = Allpatientsar.map((r, i) => ({
            name: r.name,
            age: r.age,
            bloodgroup: r.bloodgroup,
          }));
          return gg;
          //endftechiung
        }
      } catch (error) {
        //endftechiung
        seterror(error.reason);
        console.log(error, "is the error in getallpatients ", error.reason);
        return [];
      }

      // if (Allpatientsar && !Error.isError(Allpatientsar)) {

      //     let  gg=  Allpatientsar.map((r, i) => ( {name:r.name,age:r.age,bloodgroup:r.bloodgroup}));
      //     return gg
      // }else{
      //   return []
      // }
    }
  }

  async function handlesearch() {
    setfetching(true);
    let data = await getallpatients();
    if (search.trim() == "") {
      console.log(data, "sthe dataainsearch empty ");
      if (data) {
        setfetching(false);
        setAllpatients(data);
      }
      return;
    }
    let filtereddata = await filterfromallpatients(data, search);
    if (filtereddata.length > 0) {
      console.log(filtereddata, "isfilterde");
      setfetching(false);

      setAllpatients(filtereddata);
    }
  }

  useEffect(() => {
    async function get(params) {
      if (search.trim() == "") {
        setfetching(true);
        let data = await getallpatients();
        if (data.length > 0) {
          setfetching(false);
          console.log(data, "inemptyarr");
          setAllpatients(data);
        }
      } else {
        let searchvaliue = search.trim();
        let data = await getallpatients();
        if (data.length > 0) {
          let filter = data.filter((el) => {
            return el.name.includes(searchvaliue);
          });
          if (filter.length > 0) {
            setAllpatients(filter)
          }
        }
      }
    }
    get();
  }, [search]);

  if (error) {
    return <h1> {error}</h1>;
  }

  return (
    <Box
      textAlign={"start"}
      zIndex={-1}
      boxSizing={"border-box"}
      height={"auto"}
      width={"100%"}
    >
      <Typography
        variant="h3"
        mt={3}
        fontWeight={"700"}
        color="primary.main"
        component={"h2"}
      >
        All patients
      </Typography>
      <Box width={"100%"} p={"1em"} display={"flex"}>
        <TextField
          label="enter the username to search"
          onChange={(e) => setsearch(e.target.value)}
          value={search}
          fullWidth
          sx={{ width: "500px" }}
          size="small"
        />
        <Button onClick={handlesearch} variant="contained">
          search{" "}
        </Button>
      </Box>
      {fetching ? (
        <>
          <Container
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button loading variant="outlined">
              Loading...
            </Button>
          </Container>
        </>
      ) : (
        <List
          sx={{
            boxSizing: "border-box",

            width: "95%",
            borderRadius: "9px ",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",

            position: "relative",
            overflow: "auto",
          }}
        >
          {Allpatients?.map((patient) => (
            <>
              <Grid container padding={"1em"}>
                <Grid size={{ xs: 12, md: 8 }}>
                  <Box
                    boxSizing={"border-box"}
                    paddingLeft={"1em"}
                    textAlign={"start"}
                  >
                    <Typography
                      variant="h5"
                      fontFamily={"monospace"}
                      component={"p"}
                    >
                      {patient.name}
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Stack
                    spacing={2}
                    width={"100%"}
                    direction={"row"}
                    display={"flex"}
                  >
                    <Button
                      size="small"
                      color="secondary"
                      onClick={() => {
                        urlparams.set("uname", patient.name);
                        redirect(`/addreport?${urlparams.toString()}`);
                      }}
                      // loading={loading}
                      loadingPosition="start"
                      startIcon={<AddSharpIcon />}
                      variant="contained"
                    >
                      Add Report
                    </Button>
                    <Button
                      size="small"
                      color="secondary"
                      onClick={() => {
                        urlparams.set("uname", patient.name);
                        redirect(`/viewpatientd?${urlparams.toString()}`);
                      }}
                      // loading={loading}
                      loadingPosition="start"
                      startIcon={<RemoveRedEyeRounded />}
                      variant="contained"
                    >
                      view details
                    </Button>
                  </Stack>
                </Grid>
              </Grid>

              <Divider />
            </>
          ))}
        </List>
      )}
    </Box>
  );
}

export default Hospitalmainpage;
