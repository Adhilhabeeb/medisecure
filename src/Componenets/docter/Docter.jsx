"use client";

import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { fetchdoctores } from "./addpatinettodocter";
import { Authcontext } from "../Authpassing";
import Link from "next/link";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase";

function Docter() {


  
  const { userdetails } = useContext(Authcontext);
  const [docterdetails, setdocterdetails] = useState(null);
  const [hospital, setHospital] = useState(null);



  useLayoutEffect(() => {
    async function fetchDr() {
      const doctors = await fetchdoctores();
      const currentDoc = doctors?.find(
        (item) => item.docteremail === userdetails.email
      );
      setdocterdetails(currentDoc);
    }
    fetchDr();
  }, []);

  useEffect(() => {
    // Listen to the entire "users" collection
    const unsub = onSnapshot(collection(db, "Docters"), (snapshot) => {
      const usersArray = snapshot.docs.map((doc) => ({
        id: doc.id,        // document ID
        ...doc.data(),     // document data
      }));

          const currentDoc =  usersArray?.find(
        (item) => item.docteremail === userdetails.email
      );
      setdocterdetails(currentDoc);
    });

    // Cleanup when the component unmounts
    return () => unsub();
  }, []);


  const toggleHospital = (name) => {
    setHospital((prev) => (prev === name ? null : name));
  };

return (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-6">
    {/* ✅ Doctor Card Header */}
    <div className="max-w-5xl mx-auto bg-white shadow-xl p-8 rounded-2xl border border-gray-200">
      <div className="flex items-center gap-6">
        {/* Doctor Profile Logo */}
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center rounded-full text-3xl font-semibold shadow-lg">
          {docterdetails?.doctername?.charAt(0) || "D"}
        </div>
        {/* Doctor Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Dr. {docterdetails?.doctername}
          </h1>
          <p className="text-gray-500 text-sm">{docterdetails?.docteremail}</p>
          <p className="mt-3 inline-block px-4 py-1 bg-blue-100 text-blue-700 font-medium rounded-full text-sm">
            Specialist in {docterdetails?.specilist}
          </p>
        </div>
      </div>
    </div>

    {/* ✅ Hospital List Section */}
    <div className="max-w-5xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        🏥 Hospitals You Work In
      </h2>

      <div className="space-y-4">
        {docterdetails?.hospitalname?.map((item, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            {/* Clickable Hospital Header */}
            <div
              onClick={() => toggleHospital(item)}
              className="flex justify-between items-center p-4 cursor-pointer"
            >
              <h3 className="text-lg font-medium text-gray-800">{item}</h3>
              <span className="text-gray-500 text-sm">
                {hospital === item ? "▲" : "▼"}
              </span>
            </div>

            {/* ✅ Patients Under Hospital */}
            {hospital === item && (
              <div className="px-5 pb-5 bg-gray-50 rounded-b-xl">
                <p className="font-medium text-gray-700 mb-3 border-b pb-2">
                  👤 Patients List
                </p>

                <div className="grid gap-2">
                  {docterdetails?.patinets?.filter((p) => p.hospitalname === item).length > 0
                    ? docterdetails?.patinets
                        ?.filter((p) => p.hospitalname === item)
                        .map((patient, i) => (
                          <Link
                            key={i}
                            href={`/docterviewreports/${patient.name}`}
                            className="block bg-white border border-gray-200 shadow-sm p-3 rounded-md hover:bg-blue-50 hover:border-blue-400 hover:shadow-lg transition-all"
                          >
                            {patient.name}
                          </Link>
                        ))
                    : <p className="text-gray-500 italic">No patients assigned yet.</p>}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ✅ Shared Patients Section */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">🔄 Shared Patients</h2>
        <div className="space-y-3">
          {docterdetails?.sharedpatients?.length > 0 ? (
            docterdetails.sharedpatients.map((el, idx) => (
              <Link
                key={idx}
                href={`/docterviewreports/${el.name}?docteremailpass=${el.docter}`}
                className="block bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:bg-green-50 hover:border-green-400 hover:shadow-lg transition-all"
              >
                {el.name} <span className="text-gray-500 text-sm">from Dr. {el.docter}</span>
              </Link>
            ))
          ) : (
            <p className="text-gray-500 italic">No shared patients available.</p>
          )}
        </div>
      </div>
    </div>
  </div>
);

}

export default Docter;
