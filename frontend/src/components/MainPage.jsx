import Navbar from "./Navbar";
import Footer from "./Footer";
import Card from "./Card";
import GettingStarted from "./GettingStarted";
import DashBoard from "./DashBoard";
import More from "./More";

import React from "react";

export default function MainPage({ userName }) {
  return (
    <div>
      <Navbar user={ userName }/>
      <Card />
      <More />
      <GettingStarted />
      <DashBoard />
      <Footer />
    </div>
  );
}
