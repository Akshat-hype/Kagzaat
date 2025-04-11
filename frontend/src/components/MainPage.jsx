import Navbar from "./Navbar";
import Footer from "./Footer";
import Card from "./Card";
import GettingStarted from "./GettingStarted";
import DashBoard from "./DashBoard";

import React from "react";

export default function MainPage() {
  return (
    <div>
      <Navbar />
      <Card />
      <GettingStarted />
      <DashBoard />
      <Footer />
    </div>
  );
}
