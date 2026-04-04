
import React, { useState, useEffect } from 'react';

interface HomeSliderProps {
  slides: any[];
}

const HomeSlider: React.FC<HomeSliderProps> = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  if (slides.length === 0) return null;

  return (
    <section className="py-20 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-slate-900 mb-4 uppercase tracking-tighter">Life at MORAVIA</h2>
          <p className="text-slate-600 max-w-2xl mx-auto font-medium">Take a glimpse into our vibrant school environment and world-class facilities.</p>
        </div>

        <div className="relative group max-w-5xl mx-auto">
          <div className="relative h-[400px] sm:h-[500px] md:h-[600px] w-full overflow-hidden rounded-[3rem] shadow-2xl border-4 border-white">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-12">
                  <h3 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase tracking-tighter">
                    {slide.title}
                  </h3>
                  <p className="text-slate-200 text-lg md:text-xl max-w-2xl font-medium leading-relaxed">
                    {slide.description}
                  </p>
                </div>
              </div>
            ))}

            {/* Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-4 rounded-2xl bg-white/10 backdrop-blur-md text-white hover:bg-amber-600 transition-all opacity-0 group-hover:opacity-100 shadow-xl"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-4 rounded-2xl bg-white/10 backdrop-blur-md text-white hover:bg-amber-600 transition-all opacity-0 group-hover:opacity-100 shadow-xl"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="flex justify-center gap-3 mt-8">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-500 ${
                  index === currentIndex ? 'w-12 bg-slate-900' : 'w-3 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSlider;
