import React from "react";

const Summarization = () => {
  const features = [
    "Effortlessly track treatment and history.",
    "Access medical records anytime, anywhere.",
    "One platform for all your pet care needs.",
    "Modern, simple, and pet-parent friendly.",
  ];

  return (
    <div className="max-w-6xl mx-auto p-12 bg-emerald-900 rounded-3xl overflow-hidden mb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Section */}
        <div className="text-white">
          <h2
            className="text-4xl font-semibold mb-6 leading-tight font-[AppleGaramond] text-center md:text-left"
          >
            Keep Pet's Care History, <br /> Just a Click Away
          </h2>

          <ul className="space-y-4 mb-6">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center bg-emerald-700">
                  <span className="text-white">✓</span>
                </div>
                <span className="text-white text-lg font-[NeueMontreal]">
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          <div className="text-center md:text-left">
            <button
              className="px-6 py-2 text-lg border border-white/20 text-white rounded-lg hover:bg-white/10 transition-colors duration-200"
              aria-label="Explore more about pet care history"
            >
              Explore more
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="relative flex justify-center">
          <video
            src="/concept1.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full max-w-md object-cover rounded-3xl"
            aria-label="Video showcasing pet care features"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export default Summarization;
