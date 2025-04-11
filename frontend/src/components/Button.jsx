export default function Button({ children }) {
    return (
      <button className="text-2xl rounded-xl p-2 m-8 w-36 shadow-xl/30 bg-indigo-50 hover:bg-sky-200 focus:outline-2 focus:outline-offset-2 transform transition-transform duration-200 hover:scale-105 ">
        {children}
      </button>
    );
  }
  