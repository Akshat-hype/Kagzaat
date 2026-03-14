import React, { useEffect, useState, useRef } from "react";
import { db, auth } from "../firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import DocumentCard from "./Card";
import { useSwipeable } from "react-swipeable";
import "./DocumentsCarousel.css";

export default function FirestoreTest() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const projectId = db.app.options.projectId || "unknown-project";

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
    let unsubscribeDocs = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (unsubscribeDocs) {
        unsubscribeDocs();
        unsubscribeDocs = null;
      }

      if (!user) {
        setDocs([]);
        setLoading(false);
        setError("Please sign in to load your documents.");
        return;
      }

      setLoading(true);
      setError("");

      const docsRef = collection(db, "users", user.uid, "uploads");

      const mapAndSortDocs = (snapshot) =>
        snapshot.docs
          .map((docItem) => ({
            id: docItem.id,
            ...docItem.data(),
          }))
          // Keep newest first while still allowing older docs without createdAt.
          .sort((a, b) => {
            const aMs = a.createdAt?.toMillis?.() || 0;
            const bMs = b.createdAt?.toMillis?.() || 0;
            return bMs - aMs;
          });

      unsubscribeDocs = onSnapshot(
        docsRef,
        (snapshot) => {
          const fetchedDocs = mapAndSortDocs(snapshot);
          setDocs(fetchedDocs);
          setCurrentIndex((prev) => {
            if (fetchedDocs.length === 0) return 0;
            return Math.min(prev, fetchedDocs.length - 1);
          });
          setLoading(false);
        },
        (firestoreError) => {
          if (firestoreError?.code !== "permission-denied") {
            console.error("Error fetching Firestore docs:", firestoreError);
            setError(
              firestoreError?.code
                ? `${firestoreError.code}: ${firestoreError.message}`
                : "Unable to load documents from Firestore."
            );
            setDocs([]);
            setLoading(false);
            return;
          }

          const uid = user?.uid || "unknown-uid";
          const nestedPath = `users/${uid}/uploads`;
          console.error("Firestore permission denied on nested uploads path", {
            projectId,
            uid,
            attemptedPath: nestedPath,
            code: firestoreError?.code,
            message: firestoreError?.message,
          });

          // Fallback for projects storing uploads at top-level collection.
          const legacyQuery = query(
            collection(db, "uploads"),
            where("ownerUid", "==", user.uid)
          );

          if (unsubscribeDocs) {
            unsubscribeDocs();
          }

          unsubscribeDocs = onSnapshot(
            legacyQuery,
            (legacySnapshot) => {
              const fetchedDocs = mapAndSortDocs(legacySnapshot);
              setDocs(fetchedDocs);
              setCurrentIndex((prev) => {
                if (fetchedDocs.length === 0) return 0;
                return Math.min(prev, fetchedDocs.length - 1);
              });
              setError(
                "Using legacy uploads path because users/{uid}/uploads is blocked by rules."
              );
              setLoading(false);
            },
            (legacyError) => {
              console.error("Error fetching Firestore docs:", legacyError);
              const legacyPath = "uploads (where ownerUid == auth.uid)";
              const details = `Project: ${projectId} | UID: ${uid} | Paths: ${nestedPath}, ${legacyPath}`;
              setError(
                legacyError?.code
                  ? `${legacyError.code}: ${legacyError.message}. ${details}`
                  : `Unable to load documents from Firestore. ${details}`
              );
              setDocs([]);
              setLoading(false);
            }
          );
        }
      );
    });

    return () => {
      if (unsubscribeDocs) {
        unsubscribeDocs();
      }
      unsubscribeAuth();
    };
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

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {docs.length > 0 ? (
          <div className="relative">
            {/* Carousel Container */}
            <div className="overflow-hidden min-h-[640px]">
              <div
                {...handlers}
                className="flex transition-transform duration-300 ease-out"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
                ref={carouselRef}
              >
                {docs.map((docData, index) => (
                  <div
                    key={docData.id}
                    className={`w-full flex-shrink-0 px-4 transition-all duration-300 ${
                      index === currentIndex
                        ? "z-10 scale-100"
                        : "z-0 scale-95 opacity-90"
                    }`}
                  >
                    <DocumentCard
                      documentName={docData.documentName}
                      ipfsHash={docData.ipfsHash}
                      ocrFields={docData.ocrFields}
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
                  className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full hover:bg-blue-50 disabled:opacity-30 transition-all"
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
                  className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full hover:bg-blue-50 disabled:opacity-30 transition-all"
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
          <div className="bg-white rounded-xl p-8 text-center">
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
