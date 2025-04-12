import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Card from "./Card";
import GettingStarted from "./GettingStarted";
import DashBoard from "./DashBoard";
import More from "./More";
import FileUploadCard from "./Fileupload";
import FirestoreTest from "./FirestoreTest";

export default function MainPage({ userName }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar user={userName} />

      <main className="flex-grow container mx-auto px-4 py-8">
        
        <FileUploadCard />
        <FirestoreTest user={userName} />
        <DashBoard />
        <GettingStarted />
        <More />
      </main>

      <Footer />
    </div>
  );
}
