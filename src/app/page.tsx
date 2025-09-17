"use client"
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { ImageClassificationOutput, pipeline } from "@huggingface/transformers";
import { ChangeEvent, useEffect, useState } from "react";
 type hh={
  score:number,
  label:string

 }

 
export default function Home() {

const [selectedFile, setSelectedFile] = useState<File|null>(null);

  const handleFileChange = (event:ChangeEvent<HTMLInputElement>) => {
    // Access the selected file(s) from event.target.files
    if (event.target.files && event.target.files[0]) {
      console.log(event.target.files[0])
      setSelectedFile(event.target.files[0]); // Store the first selected file
      
    }
  };
async function classifyImage(file: File | null) {
  if (!file) return;

  try {
    const classifier = await pipeline("image-classification", "Xenova/vit-base-patch16-224", {
      dtype: "q4",
    });

    // Convert the File object to a URL
    const imageUrl = URL.createObjectURL(file);

    // Classify the image
    const output: any = await classifier(imageUrl);
    console.log(output, "classification output");

    // Example: find top result
    const topResult = output[0];
    console.log(topResult, "top result");
    return topResult;
  } catch (error) {
    console.error(error);
  }
}





  useEffect(() => {

if (selectedFile) {
  


  classifyImage(selectedFile)
}
  },[selectedFile])
  
  return (
  <>
  <Link href={"/signup"}>
    <button> clll</button>
    
  </Link>

      <input type="file" onChange={handleFileChange} />

  
  </>
  );
}
