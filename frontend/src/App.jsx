import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import JoySignInSideTemplate from "./components/JoySignInSideTemplate";
import MainPage from "./components/MainPage";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      {user ? (
        <MainPage userName={user.displayName || user.email} />
      ) : (
        <JoySignInSideTemplate />
      )}
    </>
  );
}
