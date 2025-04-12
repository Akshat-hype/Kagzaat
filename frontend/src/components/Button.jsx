export default function Button({ children ,onClick }) {
    return (
      <button onClick={onClick} className=" rounded-xl p-2 m-8 w-50 shadow-xl/30 bg-indigo-50 hover:bg-sky-200 focus:outline-2 focus:outline-offset-2 transform transition-transform duration-200 hover:scale-105 ">
        {children}
      </button>
    );
  }
  