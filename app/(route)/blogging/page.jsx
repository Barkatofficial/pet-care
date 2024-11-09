"use client";

import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import Slider from "react-slick";
import Modal from 'react-modal';

// Sample data for programs
const programs = [
  {
    title: 'Basic Obedience Training',
    description: 'Foundational training for all dogs, covering essential commands.',
    subPrograms: [
      {
        title: 'Sit Command',
        description: 'Step-by-step guide to teach your dog the Sit command.',
        videos: [
          { title: 'Introduction to Sit Command', videoUrl: '/videos/sit-command-intro.mp4', details: 'Learn how to get your dog into a sitting position using simple techniques and rewards.', thumbnail: '/images/sit-command-thumbnail.jpg' },
          { title: 'Advanced Sit Command Techniques', videoUrl: '/videos/sit-command-advanced.mp4', details: 'Master the Sit command even with distractions and longer durations.', thumbnail: '/images/sit-command-advanced-thumbnail.jpg' },
        ],
      },
      {
        title: 'Stay Command',
        description: 'Teach your dog to stay in one place and wait for your signal.',
        videos: [
          { title: 'Stay Command Basics', videoUrl: '/videos/stay-command-basics.mp4', details: 'A beginner-friendly tutorial on how to keep your dog still.', thumbnail: '/images/stay-command-thumbnail.jpg' },
          { title: 'Prolonged Stay Techniques', videoUrl: '/videos/stay-command-prolonged.mp4', details: 'How to increase your dog’s staying duration over time.', thumbnail: '/images/stay-command-prolonged-thumbnail.jpg' },
        ],
      },
    ],
  },
  {
    title: 'Advanced Training',
    description: 'Training programs for experienced dogs, focusing on off-leash control.',
    subPrograms: [
      {
        title: 'Off-Leash Training',
        description: 'Train your dog to follow commands without the need for a leash.',
        videos: [
          { title: 'Off-Leash Basics', videoUrl: '/videos/off-leash-basics.mp4', details: 'How to start training your dog to walk off-leash with basic control.', thumbnail: '/images/off-leash-thumbnail.jpg' },
        ],
      },
      {
        title: 'Recall Training',
        description: 'Teach your dog to come to you when called, even with distractions.',
        videos: [
          { title: 'Recall Basics', videoUrl: '/videos/recall-basics.mp4', details: 'Introduction to recall commands for off-leash control.', thumbnail: '/images/recall-basics-thumbnail.jpg' },
          { title: 'Recall in Public Spaces', videoUrl: '/videos/recall-public-spaces.mp4', details: 'How to train recall commands in parks and open areas.', thumbnail: '/images/recall-public-thumbnail.jpg' },
        ],
      },
    ],
  },
  {
    title: 'Behavioral Modification',
    description: 'Training programs for dealing with common behavioral issues.',
    subPrograms: [
      {
        title: 'Separation Anxiety',
        description: 'Help your dog overcome anxiety when left alone.',
        videos: [
          { title: 'Managing Separation Anxiety', videoUrl: '/videos/separation-anxiety.mp4', details: 'Learn techniques to manage and reduce separation anxiety in dogs.', thumbnail: '/images/separation-anxiety-thumbnail.jpg' },
        ],
      },
      {
        title: 'Leash Reactivity',
        description: 'Reduce your dog’s over-excitement or aggression on leash.',
        videos: [
          { title: 'Leash Reactivity Basics', videoUrl: '/videos/leash-reactivity.mp4', details: 'Step-by-step guide to reduce leash aggression.', thumbnail: '/images/leash-reactivity-thumbnail.jpg' },
        ],
      },
    ],
  },
];

// Custom arrow components for slider navigation
const NextArrow = (props) => (
  <div {...props} className="slick-next text-2xl text-blue-500">→</div>
);
const PrevArrow = (props) => (
  <div {...props} className="slick-prev text-2xl text-blue-500">←</div>
);

export default function Page() {
  const [activeProgram, setActiveProgram] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState("");

  const toggleProgram = (index) => {
    setActiveProgram(activeProgram === index ? null : index);
  };

  const handleVideoClick = (videoUrl) => {
    setCurrentVideoUrl(videoUrl);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentVideoUrl("");
  };

  const filteredPrograms = programs.filter(program =>
    program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    program.subPrograms.some(sub => sub.title.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto py-16 px-6">
      <h1 className="text-5xl font-extrabold text-gray-800 mb-10 text-center">Dog Training Programs</h1>

      {/* Search Bar */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search programs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>

      <div className="space-y-8">
        {filteredPrograms.length > 0 ? (
          filteredPrograms.map((program, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-6 transition-transform duration-300 hover:bg-gray-100">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleProgram(index)}
              >
                <h2 className="text-3xl font-semibold text-gray-900">{program.title}</h2>
                <span>{activeProgram === index ? <ChevronUpIcon className="h-6 w-6" /> : <ChevronDownIcon className="h-6 w-6" />}</span>
              </div>
              {activeProgram === index && (
                <div className="mt-4">
                  <p className="text-lg text-gray-700 mb-4">{program.description}</p>
                  {/* Grid layout for sub-programs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {program.subPrograms.map((subProgram, subIndex) => (
                      <div key={subIndex} className="bg-gray-100 p-4 rounded-lg">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{subProgram.title}</h3>
                        <p className="text-gray-600 mb-3">{subProgram.description}</p>
                        {/* Slider for videos */}
                        <Slider {...sliderSettings}>
                          {subProgram.videos.map((video, videoIndex) => (
                            <div key={videoIndex}
                              className="bg-white shadow-sm rounded-lg p-4 transition-transform duration-300 transform hover:-translate-y-1 cursor-pointer"
                              onClick={() => handleVideoClick(video.videoUrl)}>
                              <img src={video.thumbnail} alt={video.title} className="w-full h-auto rounded-md mb-3" />
                              <h4 className="text-lg font-medium text-gray-900">{video.title}</h4>
                              <p className="text-gray-500">{video.details}</p>
                            </div>
                          ))}
                        </Slider>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No programs found.</p>
        )}
      </div>

      {/* Modal for Video Playback */}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} ariaHideApp={false} style={{ overlay: { backgroundColor: 'rgba(0,0,0,0.75)' }, content: { top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%', transform: 'translate(-50%, -50%)', width: '80%', maxWidth: '600px' } }}>
        <button onClick={closeModal} className="absolute top-2 right-2 text-white bg-red-500 rounded-full p-2">X</button>
        <video controls className="w-full rounded-md">
          <source src={currentVideoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Modal>
    </div>
  );
}
