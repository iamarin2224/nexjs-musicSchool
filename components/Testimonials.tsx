"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

const testimonials = [
  {
    quote:
      "The structured curriculum and real-time feedback completely changed how I practice. I finally understand technique instead of just copying songs. My progress in just a few months has been more than what I achieved in years of self-learning.",
    name: "Arjun Mehta",
    title: "Guitar Student",
  },
  {
    quote:
      "What sets this school apart is the attention to detail. From breathing techniques to tonal control, every lesson feels intentional. The instructors push you just enough to improve without overwhelming you.",
    name: "Riya Sengupta",
    title: "Vocal Performance Student",
  },
  {
    quote:
      "I came in with basic knowledge of music production, but the structured approach helped me think like a professional. The emphasis on workflow, sound design, and mixing fundamentals was exactly what I needed.",
    name: "Kunal Verma",
    title: "Music Production Student",
  },
  {
    quote:
      "The collaborative environment makes learning enjoyable and motivating. Practicing alongside serious musicians pushed me to be consistent and disciplined. It feels less like an online course and more like a real music institute.",
    name: "Sneha Iyer",
    title: "Electronic Music Student",
  },
  {
    quote:
      "This program helped me unlearn bad habits and rebuild my fundamentals properly. The feedback is honest, precise, and extremely valuable. I now feel confident performing and recording my own music.",
    name: "Rahul Banerjee",
    title: "Advanced Instrumentalist",
  },
];


export  default function TestimonialCards() {
  return (
    <div className="h-[40rem] w-full dark:bg-black relative flex flex-col items-center justify-center overflow-hidden">
        <div
            className={cn(
            "absolute -inset-1",
            "[background-size:40px_40px]",
            "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
            "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
            )}
        />

        <h2 className="text-4xl font-bold text-center mb-8 z-10">Hear our Harmony: Voices of success</h2>
        <div className="flex justify-center w-full overflow-hidden px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-6xl">
                <InfiniteMovingCards
                    items={testimonials}
                    direction="right"
                    speed="slow"
                />
            </div>
        </div>
    </div>
  );
}


