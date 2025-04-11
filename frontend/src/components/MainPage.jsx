import Navbar from "./Navbar";
import Footer from "./Footer";
import Card from "./Card";
import GettingStarted from "./GettingStarted";
import Slider from "./Slider";

import React from "react";

export default function MainPage() {
  return (
    <div>
      <Navbar />
      <Card />
      <GettingStarted />
      <Slider />
      <Footer />
    </div>
  );
}
