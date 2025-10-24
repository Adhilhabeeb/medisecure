import { db } from "@/firebase";
import { query, collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { addDoc } from "firebase/firestore";


async function fetchdoctores(params) {
    let promisefetchdocters = new Promise(async (resolve, reject) => {
        const q = query(collection(db, "Docters"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const fetched = [];
            querySnapshot.forEach((doc) => {
                fetched.push({ ...doc.data(), id: doc.id });
            });
            console.log(fetched, "is the fetched docters");
            const sorted = fetched.sort((a, b) => a.createdAt - b.createdAt);
            resolve(sorted);
        });
    });
    return await promisefetchdocters;
}

async function checkdocterisalreadyexist(email) {
    let fetchdoctoresdata = await fetchdoctores();
    console.log(fetchdoctoresdata, "isfetched data in checkdocter");
    let isdocterexist = fetchdoctoresdata?.some((el) => el.docteremail === email);
    let docteruser = fetchdoctoresdata?.find((el) => el.docteremail === email);
    console.log(isdocterexist, "is the docter exist in checkdocter",docteruser,"is dpcuser");
    return { isdocterexist, docteruser };
}

async function Addocter({
    docteremail,
    doctername,
    hospitalname,
    doctercontactnumber,
    specilist
}) {
    // console.log(docteremail,doctername,hospitalname,doctercontactnumber,specilist,"is the props in add docter")

    let docterdata = {
        docteremail: docteremail,
        doctername: doctername,
        hospitalname: [hospitalname],
        doctercontactnumber: doctercontactnumber,
        specilist: specilist,
        createdAt: Date.now(),
        patinets: [],
        sharedpatients:[]
    };

    let { isdocterexist, docteruser } = await checkdocterisalreadyexist(
        docteremail
    );
    console.log(isdocterexist, "is the check exist");
    let stausupdate=false;
    if (isdocterexist) {
        let userhospitalnames = docteruser.hospitalname; // if youwnt make it json 
        let hospitalnameexists = userhospitalnames.includes(hospitalname);
        if (hospitalnameexists) {
            alert("Doctor already registered with this hospital.");
            return  false;

        } else {
        return      updatehpsitalnames(docteruser.id, userhospitalnames, hospitalname);
            console.log("Hospital name added to existing doctor.");
        }
    } else {
  try {
          const docRef = await addDoc(collection(db, "Docters"), docterdata);
        console.log("Document written with ID: ", docRef.id);
        return true;
  } catch (error) {
    return false;
        console.error("Error adding document: ", error);
  }
    }
}
 async function Addpatinettodocter(datapassed) { 
    let {doctername,docterspecilist,name,hospitalname}=datapassed
let fetcheduser= await fetchdoctores()
let filterdocter=fetcheduser.find(el=>el.doctername==doctername && el.specilist==docterspecilist)
if (filterdocter) {
console.log(fetcheduser,"is the fetched user",doctername,docterspecilist,datapassed ,"and ",filterdocter)

console.log(filterdocter.patinets,"is the old patinet array")
let oldpatinetarray=filterdocter.patinets
if (!oldpatinetarray.some(el=>el.name==name && el.hospitalname==hospitalname)) {
   updatedocterpatients(filterdocter.id,oldpatinetarray,{
    name,hospitalname
   })
}
}

}

export { Addpatinettodocter, Addocter ,fetchdoctores,checkdocterisalreadyexist,addsharredpatinet};

async function updatedocterpatients(userId, oldpatinetarray, newuserobject) {
    try {
        const userRef = doc(db, "Docters", userId); // Reference to specific user document

        await updateDoc(userRef, {
            patinets: [...oldpatinetarray, newuserobject] // the field to update
        });

        console.log(" painets updated successfully!");
    } catch (error) {
        console.error("Error updating patinets:", error);
    }
}



async function updatehpsitalnames(userId, oldhosptalarray, newhpsoyalname) {
    try {
        const userRef = doc(db, "Docters", userId); // Reference to specific user document

        await updateDoc(userRef, {
            hospitalname: [...oldhosptalarray, newhpsoyalname] // the field to update
        });
        console.log("hospital name updated successfully!");

        return true;
    } catch (error) {
        console.error("Error updating username:", error);
        return false;

    }
}


  async function addsharredpatinet(data,docterdetails) {
    let {docteremail}=docterdetails
    let {docteremail:datadocteremail,patientname:datapatientname}=data


    console.log("docteremila",datadocteremail,"patinetname",datapatientname,data)



    let { isdocterexist, docteruser } = await checkdocterisalreadyexist(
        docteremail
    );

    if (docteruser) {
        let alreadyinsharedpainet= docteruser?.sharedpatients?.some(el=>el.name==datapatientname&&el.docter==datadocteremail)   
        console.log(alreadyinsharedpainet,"is already in shared patinet")
    
    if (!alreadyinsharedpainet) {

         try {
        const userRef = doc(db, "Docters", docteruser.id); // Reference to specific user document

        await updateDoc(userRef, {
         sharedpatients:[...docteruser.sharedpatients,{name:datapatientname,docter:datadocteremail}] // the field to update
        });
        console.log("sharedpatiey name updated successfully!");

        return true;
    } catch (error) {
        console.error("Error updating username:", error);
        return false;

    }
    }else{

        alert("Patient already shared with this doctor.")
    }
    
    }

    console.log(isdocterexist,"iss",docteruser,"docuser")

}