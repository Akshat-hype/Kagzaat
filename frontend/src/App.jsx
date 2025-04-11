import React from "react";
// import QrScanner from "./components/QR_scanner";

// const App = () => {
//   const handleScanSuccess = (decodedText, decodedResult) => {
//     console.log("QR Code scanned:", decodedText);
//   };

//   const handleScanFailure = (error) => {
//     console.warn("Scan error:", error);
//   };

//   return (
//     <div>
//       <h1>QR Code Scanner</h1>
//       <QrScanner onScanSuccess={handleScanSuccess} onScanFailure={handleScanFailure} />
//     </div>
//   );
// };

// // export default App;



// import React from "react";
// import UploadWithMoralis from "./components/UploadWithMoralis";

// function App() {
//   return (
//     <div className="App">
//       <UploadWithMoralis />
//     </div>
//   );
// }

// export default












import JoySignInSideTemplate from "./components/JoySignInSideTemplate";
import Fileupload from "./components/Fileupload"
import MainPage from "./components/MainPage";



function App() {
  return (
    <>
    {/* <JoySignInSideTemplate /> */}
    <MainPage />
    </>
  );
}

export default App;
