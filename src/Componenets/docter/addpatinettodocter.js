import { db } from "@/firebase";
import { query, collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { addDoc } from "firebase/firestore";
import { check } from "zod";

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
    console.log(isdocterexist, "is the docter exist in checkdocter");
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
        patinets: []
    };

    let { isdocterexist, docteruser } = await checkdocterisalreadyexist(
        docteremail
    );
    console.log(isdocterexist, "is the check exist");
    if (isdocterexist) {
        let userhospitalnames = docteruser.hospitalname; // if youwnt make it json 
        let hospitalnameexists = userhospitalnames.includes(hospitalname);
        if (hospitalnameexists) {
            alert("Doctor already registered with this hospital.");
        } else {
           updatehpsitalnames(docteruser.id, userhospitalnames, hospitalname);
            console.log("Hospital name added to existing doctor.");
        }
    } else {
        const docRef = await addDoc(collection(db, "Docters"), docterdata);
        console.log("Document written with ID: ", docRef.id);
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

export { Addpatinettodocter, Addocter ,fetchdoctores,checkdocterisalreadyexist};

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
    } catch (error) {
        console.error("Error updating username:", error);
    }
}