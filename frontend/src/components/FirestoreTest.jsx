import React, { useEffect, useState, useRef } from "react";
import { db, auth } from "../firebase";
import { collection, getDocs, doc } from "firebase/firestore";
import DocumentCard from "./Card";
import { useSwipeable } from "react-swipeable";
import "./DocumentsCarousel.css";

export default function FirestoreTest() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (currentIndex < docs.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      }
    },
    onSwipedRight: () => {
      if (currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
      }
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          console.log("No user is logged in.");
          return;
        }

        const docsRef = collection(db, "users", user.uid, "uploads");
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
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-800 mb-8">Your Documents</h1>

        {docs.length > 0 ? (
          <div className="relative">
            {/* Carousel Container */}
            <div className="overflow-hidden h-[500px]">
              <div
                {...handlers}
                className="flex transition-transform duration-300 ease-out h-full"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
                ref={carouselRef}
              >
                {docs.map((docData, index) => (
                  <div
                    key={docData.id}
                    className={`w-full flex-shrink-0 px-4 h-full transition-all duration-300 ${
                      index === currentIndex
                        ? "z-10 scale-100"
                        : "z-0 scale-95 opacity-90"
                    }`}
                  >
                    <DocumentCard
                      documentName={docData.documentName}
                      ipfsHash={docData.ipfsHash}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {docs.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentIndex === index ? "bg-blue-600 w-6" : "bg-gray-300"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            {docs.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
                  disabled={currentIndex === 0}
                  className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-blue-50 disabled:opacity-30 transition-all"
                  aria-label="Previous document"
                >
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={() =>
                    setCurrentIndex((prev) => Math.min(prev + 1, docs.length - 1))
                  }
                  disabled={currentIndex === docs.length - 1}
                  className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-blue-50 disabled:opacity-30 transition-all"
                  aria-label="Next document"
                >
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </>
            )}
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
