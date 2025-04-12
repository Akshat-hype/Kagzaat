import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, getDocs, doc } from "firebase/firestore";
import Card from "./Card"; // Now using our new Card component

export default function FirestoreTest() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          console.log("No user is logged in.");
          return;
        }

        const userDocRef = doc(db, "users", user.uid);
        const docsRef = collection(userDocRef, "uploads");

        const docsSnap = await getDocs(docsRef);

        if (docsSnap.empty) {
          console.log("No documents found in uploads path.");
        } else {
          const fetchedDocs = docsSnap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setDocs(fetchedDocs);
        }
      } catch (error) {
        console.error("Error fetching Firestore docs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-800 mb-8">Your Documents</h1>
        
        {docs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {docs.map((docData) => (
              <Card 
                key={docData.id} 
                documentName={docData.documentName} 
                ipfsHash={docData.ipfsHash} 
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No documents found</h3>
            <p className="mt-1 text-gray-500">Upload your first document to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}