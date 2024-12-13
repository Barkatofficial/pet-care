"use client";

import React, { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I book a service for my pet?",
      answer:
        "Booking a service is simple. Navigate to our services section, select the desired service, and follow the instructions to book an appointment.",
    },
    {
      question: "What types of services do you offer?",
      answer:
        "We offer a range of services including vet consultations, grooming, training, and pet boarding.",
    },
    {
      question: "Is online consultation available?",
      answer:
        "Yes, we provide online consultations for your convenience. Book an online appointment and connect with our experts.",
    },
    {
      question: "How do I store my pet's medical records?",
      answer:
        "You can store all your pet's medical records securely on our platform under the Medical Records section.",
    },
    {
      question: "Can I reschedule my appointment?",
      answer:
        "Yes, you can reschedule your appointment by visiting your bookings section and selecting the reschedule option.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-[#E7FFE1] py-16 px-6 lg:px-24">
      {/* Heading */}
      <h2
        className="text-4xl lg:text-5xl font-bold text-center text-emerald-900 mb-12"
        style={{ fontFamily: "Apple Garamond, serif" }}
      >
        Frequently Asked Questions
      </h2>

      {/* FAQ List */}
      <div className="max-w-4xl mx-auto space-y-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border-b border-gray-300 pb-4 cursor-pointer"
            onClick={() => toggleFAQ(index)}
          >
            <div
              className="flex justify-between items-center"
              style={{ fontFamily: "Neue Montreal, sans-serif" }}
            >
              <h3 className="text-lg font-medium text-gray-800">
                {faq.question}
              </h3>
              <span className="text-emerald-600 text-xl">
                {openIndex === index ? "−" : "+"}
              </span>
            </div>
            {openIndex === index && (
              <p className="mt-4 text-gray-700 text-sm">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
