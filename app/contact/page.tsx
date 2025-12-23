"use client";
import React from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function Page() {
  return (
    <div className="h-screen w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4 ">
        <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold mt-10">
          Contact Us
        </h1>

        <p className="text-white max-w-lg mx-auto my-2 text-sm text-center relative z-10">
          Welcome to Music School an advanced music institution dedicated to disciplined training and artistic excellence. <br/>
          Our programs are designed to develop technique, musical understanding, and professional readiness across instruments, vocals, and production.
        </p>

        <form
          className="max-w-2xl mx-auto p-4 w-full"
          onSubmit={(e) => {
            e.preventDefault();
            // handle submit here
          }}
        >
        
        <label htmlFor="email" className="sr-only">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="Your email address"
          className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 w-full relative z-10 mt-4 p-3 bg-neutral-950 text-white placeholder:text-neutral-700 outline-none"
          />

        <label htmlFor="message" className="sr-only">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          placeholder="Your message"
          rows={4}
          className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 w-full relative z-10 mt-4 p-3 bg-neutral-950 text-white placeholder:text-neutral-700 outline-none resize-none"
          />

        <button
          type="submit"
          className="
          relative z-10 mt-6 w-full rounded-lg
          bg-gradient-to-r from-teal-500 to-emerald-500
          px-4 py-3 font-semibold text-white
          transition-all duration-300
          hover:from-teal-400 hover:to-emerald-400
          hover:shadow-lg hover:shadow-teal-500/20
          focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-neutral-950
          active:scale-[0.98]
          "
          >
          Send Message
        </button>

        </form>
      </div>
      <BackgroundBeams />
    </div>
  );
}
