// import Button from "./Button";

// export default function App() {
//   return (
//       <div className=" w-full  bg-blue-500/30 p-8 mb-20">
//         <h2 className="text-xl font-bold mb-4 text-center">Add More Documents</h2>
//         <div className="flex gap-40 ml-16">
//           <Button>ADHAAR CARD</Button>
//           <Button>10TH MARKSHEET</Button>
//           <Button>12TH MARKSHEET</Button>
//         </div>
//         <div className="flex gap-40 ml-16">
//           <Button>PAN CARD</Button>
//           <Button>CREDIT CARD</Button>
//           <Button>RATION CARD</Button>
//         </div>
//       </div>
//   );
// }


import Button from "./Button";

export default function App() {
  return (
    <div className="w-full bg-blue-500/30 p-8 mb-20">
       <div className="flex items-center my-6">
      <div className="flex-grow h-1 bg-gradient-to-r from-transparent via-blue-950 to-transparent" />
      <h2 className="mx-4 text-xl font-bold text-black">Add More Documents</h2>
      <div className="flex-grow h-1 bg-gradient-to-r from-transparent via-blue-950 to-transparent" />
    </div>
      
      {/* Reduced vertical spacing with gap-y-2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2 max-w-5xl mx-auto">
        <Button>ADHAAR CARD</Button>
        <Button>10TH MARKSHEET</Button>
        <Button>12TH MARKSHEET</Button>
        <Button>PAN CARD</Button>
        <Button>CREDIT CARD</Button>
        <Button>RATION CARD</Button>
      </div>
    </div>
  );
}
