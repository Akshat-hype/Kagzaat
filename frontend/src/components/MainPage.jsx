import Navbar from "./Navbar";
import Footer from "./Footer";
import Card from "./Card";
import GettingStarted from "./GettingStarted";
import DashBoard from "./DashBoard";
import More from "./More";
import FileUploadCard from "./Fileupload";

import React from "react";

export default function MainPage({ userName }) {
  return (
    <div>
      <Navbar user={ userName }/>
      <FileUploadCard />
      <Card />
      <DashBoard />
      <GettingStarted />
      <More />
      <Footer />
    </div>
  );
}
