"use client";

import { useContext, useLayoutEffect, useState } from "react";
import { fetchdoctores } from "./addpatinettodocter";
import { Authcontext } from "../Authpassing";
import Link from "next/link";

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

  const toggleHospital = (name) => {
    setHospital((prev) => (prev === name ? null : name));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      {/* Header / Profile */}
      <div className="max-w-5xl mx-auto bg-white shadow-lg p-8 rounded-2xl">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-blue-500 text-white flex items-center justify-center rounded-full text-2xl font-bold">
            {docterdetails?.doctername?.charAt(0) || "D"}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Dr. {docterdetails?.doctername}
            </h1>
            <p className="text-gray-600">{docterdetails?.docteremail}</p>
            <p className="mt-2 inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
              Specialist in {docterdetails?.specilist}
            </p>
          </div>
        </div>
      </div>

      {/* Hospital List */}
      <div className="max-w-5xl mx-auto mt-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          🏥 Hospitals You Work In
        </h2>
        <div className="space-y-4">
          {docterdetails?.hospitalname?.map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow hover:shadow-lg transition">
              <div
                onClick={() => toggleHospital(item)}
                className="flex justify-between items-center p-4 cursor-pointer"
              >
                <h3 className="text-lg font-medium text-gray-800">{item}</h3>
                <span className="text-gray-400">
                  {hospital === item ? "▲" : "▼"}
                </span>
              </div>

              {/* Patients under each hospital */}
              {hospital === item && (
                <div className="px-4 pb-4 bg-gray-50 rounded-b-xl">
                  <p className="font-medium text-gray-700 mb-2 border-b pb-2">
                    Patients List:
                  </p>
                  <div className="grid gap-2">
                    {docterdetails?.patinets
                      ?.filter((p) => p.hospitalname === item)
                      .map((patient, i) => (
                        <Link
                          key={i}
                          href={`/docterviewreports/${patient.name}`}
                          className="block bg-white shadow-sm p-2 rounded-md hover:bg-blue-50 hover:shadow-md transition"
                        >
                          {patient.name}
                        </Link>
                      ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Docter;
