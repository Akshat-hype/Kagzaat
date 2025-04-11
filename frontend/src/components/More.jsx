import Button from "./Button";

export default function App() {
  return (
      <div className="rounded-2xl m-16 bg-indigo-800 ">
        <div className="flex gap-80 ml-12">
          <Button>ADHAAR CARD</Button>
          <Button>12TH MARKSHEET</Button>
          <Button>10TH MARKSHEET</Button>
        </div>
        <div className="flex gap-80 ml-12">
          <Button>PAN CARD</Button>
          <Button>DEBIT CARD</Button>
          <Button>ADHAAR CARD</Button>
        </div>
      </div>
  );
}
