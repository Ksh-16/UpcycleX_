"use client";

import Link from "next/link";
import { useState } from "react";

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1600&h=900&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-white/75"></div>
        <div className="container mx-auto px-5 py-24 relative">
          <div
            className="max-w-3xl mx-auto relative z-10 rounded-3xl shadow-xl backdrop-blur-md p-10 md:p-12 border border-emerald-200/60"
            style={{ background: "rgba(247, 218, 154, 0.318)" }}
          >
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Turn <span className="font-bold text-emerald-700">Waste</span> Into{" "}
              <span className="font-bold text-emerald-700">Worth</span>
            </h1>
            <p className="mb-8 leading-relaxed text-gray-800 font-medium mt-4">
              Transform household waste into valuable products through our community of skilled tailors and makers. Every item you upcycle makes a difference.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/upload"
                className="inline-flex text-white bg-green-500 py-2 px-6 rounded-lg hover:bg-green-400 transition"
              >
                START UPCYCLING
              </Link>
              <Link
                href="/connect"
                className="inline-flex bg-white text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-100 border transition"
              >
                HOW TO START
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What Can You Upcycle Section */}
      <section
        className="text-gray-600 body-font"
        style={{
          background: "linear-gradient(145deg,#17580eb9,#8cc8328b,#0b906f)",
          boxShadow: "inset 0 6px 18px rgba(71, 30, 30, 0.6), inset 0 -6px 18px rgba(253, 24, 24, 0.08)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">UpCycleX</h2>
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">What can you upcycle?</h1>
          </div>
          <div className="flex flex-wrap -m-4">
            {/* Clothes */}
            <div className="p-4 md:w-1/3">
              <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                <div className="flex items-center mb-3">
                  <div className="w-16 h-16 mr-3 inline-flex items-center justify-center rounded-full bg-green-100 text-green-600 flex-shrink-0">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h2 className="text-gray-900 text-lg title-font font-medium">Clothes</h2>
                </div>
                <div className="flex-grow">
                  <p className="leading-relaxed text-base">Transform old clothes into new, stylish pieces with our upcycling services.</p>
                  <Link href="/marketplace?category=Fashion" className="mt-3 text-indigo-500 inline-flex items-center">
                    Explore
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            {/* Bottles */}
            <div className="p-4 md:w-1/3">
              <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                <div className="flex items-center mb-3">
                  <div className="w-16 h-16 mr-3 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-600 flex-shrink-0">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <h2 className="text-gray-900 text-lg title-font font-medium">Bottles</h2>
                </div>
                <div className="flex-grow">
                  <p className="leading-relaxed text-base">Transform empty bottles into new, useful items with our upcycling services.</p>
                  <Link href="/marketplace?category=Home%20Decor" className="mt-3 text-indigo-500 inline-flex items-center">
                    Explore
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            {/* Furniture */}
            <div className="p-4 md:w-1/3">
              <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                <div className="flex items-center mb-3">
                  <div className="w-16 h-16 mr-3 inline-flex items-center justify-center rounded-full bg-amber-100 text-amber-600 flex-shrink-0">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <h2 className="text-gray-900 text-lg title-font font-medium">Furniture</h2>
                </div>
                <div className="flex-grow">
                  <p className="leading-relaxed text-base">Transform old furniture into new, stylish pieces with our upcycling services.</p>
                  <Link href="/marketplace?category=Home%20Decor" className="mt-3 text-indigo-500 inline-flex items-center">
                    Explore
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            {/* Plastics */}
            <div className="p-4 md:w-1/3">
              <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                <div className="flex items-center mb-3">
                  <div className="w-16 h-16 mr-3 inline-flex items-center justify-center rounded-full bg-purple-100 text-purple-600 flex-shrink-0">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                    </svg>
                  </div>
                  <h2 className="text-gray-900 text-lg title-font font-medium">Plastics</h2>
                </div>
                <div className="flex-grow">
                  <p className="leading-relaxed text-base">Transform old plastics and bags into showpieces with our upcycling services.</p>
                  <Link href="/marketplace" className="mt-3 text-indigo-500 inline-flex items-center">
                    Explore
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section
        className="relative overflow-hidden bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&h=900&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-white/60"></div>
        <div className="relative z-10 container mx-auto px-5 py-24">
          <div
            className="max-w-3xl mx-auto rounded-3xl shadow-xl backdrop-blur-md border border-emerald-200/60 p-10 md:p-12"
            style={{ background: "rgba(171, 247, 154, 0.35)" }}
          >
            <div className="space-y-10">
              {/* Step 1 */}
              <div className="flex">
                <div className="w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <div className="flex-grow pl-4">
                  <h2 className="font-semibold tracking-wider text-gray-900">UPLOAD WASTE</h2>
                  <p className="text-gray-700">Take a photo of items you want to upcycle</p>
                </div>
              </div>
              {/* Step 2 */}
              <div className="flex">
                <div className="w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                  </svg>
                </div>
                <div className="flex-grow pl-4">
                  <h2 className="font-semibold tracking-wider text-gray-900">AI DETECTION</h2>
                  <p className="text-gray-700">Our AI identifies material and suggests ideas</p>
                </div>
              </div>
              {/* Step 3 */}
              <div className="flex">
                <div className="w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="5" r="3"/>
                    <path d="M12 22V8M5 12H2a10 10 0 0020 0h-3"/>
                  </svg>
                </div>
                <div className="flex-grow pl-4">
                  <h2 className="font-semibold tracking-wider text-gray-900">CONNECT & CREATE</h2>
                  <p className="text-gray-700">Create/design your idea or connect with tailors/makers</p>
                </div>
              </div>
              {/* Step 4 */}
              <div className="flex">
                <div className="w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <div className="flex-grow pl-4">
                  <h2 className="font-semibold tracking-wider text-gray-900">PLACE ORDER</h2>
                  <p className="text-gray-700">Get your upcycled item delivered</p>
                </div>
              </div>
              {/* Step 5 */}
              <div className="flex">
                <div className="w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                    <path d="M22 4L12 14.01l-3-3"/>
                  </svg>
                </div>
                <div className="flex-grow pl-4">
                  <h2 className="font-semibold tracking-wider text-gray-900">TRACK IMPACT</h2>
                  <p className="text-gray-700">Track your environmental impact</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feedback / Contact Section */}
      <section className="text-gray-600 body-font relative">
        <div className="absolute inset-0 bg-gray-300">
          <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            title="map"
            scrolling="no"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6130966.52354933!2d68.1766458!3d22.3511148!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff5b9b8b1c7%3A0x39c8b8d5a1b2bb63!2sIndia!5e0!3m2!1sen!2sin!4v1704970000000"
            style={{ filter: "grayscale(1) contrast(1.2) opacity(0.4)" }}
          ></iframe>
        </div>
        <div className="container px-5 py-24 mx-auto flex">
          <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
            <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">Feedback</h2>
            <p className="leading-relaxed mb-5 text-gray-600">Give us your valuable Feedback</p>
            <div className="relative mb-4">
              <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label htmlFor="message" className="leading-7 text-sm text-gray-600">Message</label>
              <textarea
                id="message"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
              ></textarea>
            </div>
            <button className="text-white bg-green-800 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg transition-colors">
              Submit
            </button>
            <p className="text-xs text-gray-500 mt-3">Thank you for your time and effort</p>
          </div>
        </div>
      </section>
    </div>
  );
}
