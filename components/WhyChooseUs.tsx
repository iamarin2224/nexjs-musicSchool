"use client";
import React from "react";
import { StickyScroll } from "./ui/sticky-scroll-reveal";

const content = [
  {
    title: "Learn Together, Grow Faster",
    description:
      "Music thrives in collaboration. Train alongside fellow musicians, instructors, and mentors in an environment that encourages shared learning, constructive feedback, and creative exchange. Build musical confidence while growing as part of a serious, driven community.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] text-white">
        Learn Together, Grow Faster
      </div>
    ),
  },
  {
    title: "Live Feedback & Real-Time Guidance",
    description:
      "Progress faster with immediate feedback from experienced instructors. Whether it’s technique, tone, or timing, corrections happen as you practice—helping you refine your skills in the moment and develop strong musical instincts.",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white">
        <img
          src="https://images.pexels.com/photos/6919956/pexels-photo-6919956.jpeg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="live music instruction demo"
        />
      </div>
    ),
  },
  {
    title: "Structured Learning, Professional Standards",
    description:
      "Our curriculum is designed with clarity and progression in mind. Each course builds on the last, ensuring you master fundamentals before advancing to complex techniques. No guesswork—just a clear path from beginner to professional-level musician.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] text-white">
        Professional Music Curriculum
      </div>
    ),
  },
  {
    title: "Practice with Purpose",
    description:
      "Every lesson, exercise, and assignment is intentional. We focus on meaningful practice that translates directly to real musical ability—on stage, in the studio, or in collaborative settings. Your time is respected, and your progress is measurable.",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white">
        <img
          src="https://images.pexels.com/photos/8512413/pexels-photo-8512413.jpeg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="live music instruction demo"
        />
      </div>
    ),
  },
];


export default function WhyChooseUs() {
  return (
    <div className="w-full py-4">
      <StickyScroll content={content} />
    </div>
  );
}
