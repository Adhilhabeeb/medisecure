"use server";

import Knock from "@knocklabs/node";

const knock = new Knock({ apiKey: process.env.KNOCK_API_KEY });
const user = {
  id: "12c23775-5902-481a-b8ea-d1704aabc769",
}; 

interface hh {
    [key :string]:string
}
export default async function triggerWorkflow(docterreporst:any[],patientname:string,userdetails:hh,docterreviewofpatient:string) {
    console.log(docterreporst,"i sterporst")
  const workflow_run_id = await knock.workflows.trigger("notquick", {
    data: { message: `  ${userdetails.name}  from ${userdetails.email} sented  a patient  ${docterreviewofpatient&& `has some ${docterreviewofpatient}`} and   patient   name  is `,patientname  },
    recipients: docterreporst,
  });

  return workflow_run_id;
}