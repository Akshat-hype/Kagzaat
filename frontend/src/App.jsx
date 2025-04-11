import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase"; // make sure you export your `auth` from firebase.js

import JoySignInSideTemplate from "./components/JoySignInSideTemplate";
import MainPage from "./components/MainPage"; // this will wrap Navbar, Card, etc.

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Optional: for initial loading state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  if (loading) return <div>Loading...</div>; // You can replace this with a loader/spinner

  return (
    <>
      {user ? <MainPage /> : <JoySignInSideTemplate />}
    </>
  );
}
