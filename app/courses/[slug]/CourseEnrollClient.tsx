"use client";

import React, { useState } from "react";

interface CourseEnrollClientProps {
  course: {
    id: number;
    title: string;
    price: number;
    instructor: string;
    duration: string;
  };
}

export default function CourseEnrollClient({ course }: CourseEnrollClientProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [skillLevel, setSkillLevel] = useState("Beginner");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsSubmitted(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-neutral-950 font-bold text-sm shadow-lg shadow-teal-500/20 active:scale-[0.99] transition-all cursor-pointer"
      >
        Enroll Now (${course.price})
      </button>

      {/* Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white p-2 text-sm cursor-pointer"
            >
              ✕
            </button>

            {!isSubmitted ? (
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-teal-400 bg-teal-950/60 border border-teal-800/40 px-2.5 py-1 rounded-md">
                  Enrollment Registration
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-3">{course.title}</h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Instructor: {course.instructor} • Duration: {course.duration}
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Alex Turner"
                      className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white text-sm focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@example.com"
                      className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white text-sm focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Your Current Experience Level
                    </label>
                    <select
                      value={skillLevel}
                      onChange={(e) => setSkillLevel(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white text-sm focus:outline-none focus:border-teal-500 cursor-pointer"
                    >
                      <option value="Beginner">Complete Beginner</option>
                      <option value="Intermediate">Intermediate Hobbyist</option>
                      <option value="Advanced">Advanced / Aspiring Pro</option>
                    </select>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-neutral-950 font-bold text-sm shadow-md transition cursor-pointer"
                    >
                      Complete Registration • ${course.price}
                    </button>
                    <p className="text-[11px] text-neutral-500 text-center mt-2">
                      Instant student portal access and syllabus onboarding emailed to you.
                    </p>
                  </div>
                </form>
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-teal-500/20 border border-teal-500/40 rounded-full flex items-center justify-center text-teal-400 text-3xl mx-auto mb-4">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-white">Enrollment Confirmed!</h3>
                <p className="text-sm text-neutral-300 mt-2">
                  Welcome aboard, <strong className="text-white">{fullName}</strong>! A confirmation email and curriculum setup guide have been sent to{" "}
                  <span className="text-teal-400">{email}</span>.
                </p>
                <div className="mt-6 p-4 bg-neutral-900/60 rounded-xl border border-neutral-800 text-xs text-neutral-400 space-y-1">
                  <p>
                    Course: <span className="text-white font-medium">{course.title}</span>
                  </p>
                  <p>
                    Instructor: <span className="text-white font-medium">{course.instructor}</span>
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="mt-6 px-6 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold transition cursor-pointer"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
