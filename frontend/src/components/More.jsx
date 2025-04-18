import Button from "./Button";

export default function App() {
  
  const handleClick = (docName) => {
    console.log(`Selected Document: ${docName}`);
    window.location.href = '/'; // Navigate to the root route
  }

  return (

    <div className="w-full p-8 mb-20">
       <div className="flex items-center my-6">
      <div className="flex-grow h-1 bg-gradient-to-r from-transparent via-blue-950 to-transparent" />
      <h2 className="mx-4 text-xl font-bold text-black">Add More Documents</h2>
      <div className="flex-grow h-1 bg-gradient-to-r from-transparent via-blue-950 to-transparent" />
    </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2 max-w-5xl mx-auto">
      <Button onClick={() => handleClick("ADHAAR CARD")}>ADHAAR CARD</Button>
        <Button onClick={() => handleClick("10TH MARKSHEET")}>10TH MARKSHEET</Button>
        <Button onClick={() => handleClick("12TH MARKSHEET")}>12TH MARKSHEET</Button>
        <Button onClick={() => handleClick("PAN CARD")}>PAN CARD</Button>
        <Button onClick={() => handleClick("CREDIT CARD")}>CREDIT CARD</Button>
        <Button onClick={() => handleClick("RATION CARD")}>RATION CARD</Button>
      </div>
    </div>
    
  );
}
