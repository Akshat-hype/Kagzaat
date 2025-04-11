import Button from "./Button";

export default function App() {
  return (
      <div className=" w-full  bg-blue-500/30 p-8 mb-20">
        <h2 className="text-xl font-bold mb-4 text-center">Add More Documents</h2>
        <div className="flex gap-50 ml-16">
          <Button>ADHAAR CARD</Button>
          <Button>12TH MARKSHEET</Button>
          <Button>10TH MARKSHEET</Button>
        </div>
        <div className="flex gap-50 ml-16">
          <Button>PAN CARD</Button>
          <Button>DEBIT CARD</Button>
          <Button>ADHAAR CARD</Button>
        </div>
      </div>
  );
}
