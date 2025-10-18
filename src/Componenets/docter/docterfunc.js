
import {makecontract} from "../../walletconnect/Contract"
async function   getallpatinetsofdoc (hospitaldetails) {
let contrat= await makecontract()
        const Allpatientsar = await contrat.getallpatientsinhospital(
          hospitaldetails.name
        );

        console.log(Allpatientsar,"is all patients of doc in get all patients of doc")
}

export{getallpatinetsofdoc}