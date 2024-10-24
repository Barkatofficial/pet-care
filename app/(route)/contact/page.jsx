"use client";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const API_KEY = process.env.NEXT_PUBLIC_STAPI_API_KEY;

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/contacts`,
        {
          data: {
            Name: name,
            Email: email,
            Message: message,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );

      if (response.status === 200) {
        setSuccess(true);
        setName("");
        setEmail("");
        setMessage("");
        setError("");
      } else {
        setError("Failed to send message.");
      }
    } catch (err) {
      console.error("Network Error:", err);
      setError("Network error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-10 bg-gray-50 px-6">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-xl p-10 transform hover:scale-105 transition-transform duration-300">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Contact Us
        </h1>
        {success && (
          <p className="mb-4 text-center text-green-500">
            Message sent successfully!
          </p>
        )}
        {error && (
          <p className="mb-4 text-center text-red-500">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-gray-700 placeholder-gray-400"
            />
          </div>
          <div className="relative">
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-gray-700 placeholder-gray-400"
            />
          </div>
          <div className="relative">
            <textarea
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows="4"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-gray-700 placeholder-gray-400"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-transform duration-300"
          >
            Send Message
          </button>
        </form>
        <p className="mt-8 text-center text-gray-600">
          If you have any queries, feel free to contact us at{" "}
          <Link
            href="mailto:sayan.mukherjee.work044@gmail.com"
            className="text-yellow-500 hover:underline"
          >
            sayan.mukherjee.work044@gmail.com
          </Link>.
        </p>
      </div>
    </div>
  );
}

export default Contact;
