import React, { useRef, useEffect } from 'react';
import '../assets/slider.css'

const Slider = ({ cards = [] }) => {
  const scrollRef = useRef(null);
  const duplicatedCards = [...cards, ...cards.slice(0, 4)];
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    const scrollAmount = 220; 
    const interval = setInterval(() => {
      if (!scrollContainer) return;
      scrollContainer.scrollLeft += scrollAmount;
      const isMobile = window.innerWidth <= 768;
      const adjustedScrollAmount = isMobile ? scrollAmount / 2 : scrollAmount;

      if (
        scrollContainer.scrollLeft >=
        scrollContainer.scrollWidth - scrollContainer.clientWidth - adjustedScrollAmount
      ) {
        scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full">
      <button
        onClick={() => scrollRef.current.scrollLeft -= 300}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full p-2 hover:bg-blue-100"
      >
      </button>
      <button
        onClick={() => scrollRef.current.scrollLeft += 300}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full p-2 hover:bg-blue-100"
      >
      </button>
      <div
        ref={scrollRef}
        className="flex overflow-x-auto space-x-4 p-4 scrollbar-hide scroll-smooth"
      >
        {duplicatedCards.map((card, index) => (
          <div
            key={index}
            className="min-w-[200px] bg-white shadow-md p-4 rounded-lg flex-shrink-0 text-center"
          >
            <h3 className="font-semibold text-sm">{card.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;