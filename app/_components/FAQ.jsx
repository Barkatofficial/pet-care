"use client"
import React, { useState } from "react";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "How do I book a service for my pet?",
      answer:
        "Norem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.",
    },
    {
      question: "What services are available for my pet?",
      answer:
        "Norem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum.",
    },
    {
      question: "Can I reschedule my booking?",
      answer:
        "Norem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum.",
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "Norem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum.",
    },
    {
      question: "How do I contact customer support?",
      answer:
        "Norem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum.",
    },
    {
      question: "Is there a refund policy?",
      answer:
        "Norem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum.",
    },
    {
      question: "How do I update my profile information?",
      answer:
        "Norem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-16 text-center">
      <div className="bg-[#E7FFE1] rounded-lg p-6">
        <h2 
          className="text-[#002F1D] text-4xl font-bold mb-8"
          style={{ fontFamily: "Apple Garamond, serif" }}
        >
          Frequently Asked Questions
        </h2>

        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border-b border-[#002F1D]/10 last:border-b-0"
          >
            <button
              className="w-full py-4 flex justify-between items-center text-left"
              onClick={() => toggleFAQ(index)}
              style={{ fontFamily: "Neue Montreal, sans-serif" }}
            >
              <span className="text-[#002F1D] font-medium">{faq.question}</span>
              <span className="text-2xl text-[#002F1D]">
                {openIndex === index ? "×" : "+"}
              </span>
            </button>
            
            {openIndex === index && (
              <div className="pb-4">
                <p 
                  className="text-[#002F1D]/80 text-sm leading-relaxed"
                  style={{ fontFamily: "Neue Montreal, sans-serif" }}
                >
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
