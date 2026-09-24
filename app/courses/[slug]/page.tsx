import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import courseData from "@/data/music_courses.json";
import CourseEnrollClient from "./CourseEnrollClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return courseData.courses.map((course) => ({
    slug: course.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = courseData.courses.find((c) => c.slug === slug);

  if (!course) {
    return {
      title: "Course Not Found | Music School",
    };
  }

  return {
    title: `${course.title} | Music School`,
    description: course.description,
  };
}

export default async function CourseDetailPage({ params }: Props) {
  const { slug } = await params;
  const course = courseData.courses.find((c) => c.slug === slug);

  if (!course) {
    notFound();
  }

  const relatedCourses = courseData.courses
    .filter((c) => c.slug !== course.slug && (c.category === course.category || c.isFeatured))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-black text-white py-12 pt-32 px-4 sm:px-6 lg:px-8 antialiased">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-neutral-400 mb-8">
          <Link href="/" className="hover:text-white transition">
            Home
          </Link>
          <span>/</span>
          <Link href="/courses" className="hover:text-white transition">
            Courses
          </Link>
          <span>/</span>
          <span className="text-teal-400 font-medium truncate max-w-[200px] sm:max-w-none">
            {course.title}
          </span>
        </nav>

        {/* Main Grid: Details Left, Sidebar Right */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column (Content) */}
          <div className="lg:col-span-2 space-y-10">
            {/* Header / Intro */}
            <div>
              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-teal-400 bg-teal-950/70 border border-teal-800/50 px-3 py-1 rounded-full">
                  {course.category}
                </span>
                <span className="text-xs text-neutral-300 bg-neutral-900 border border-neutral-800 px-3 py-1 rounded-full">
                  Level: {course.level}
                </span>
                <span className="text-xs text-neutral-300 bg-neutral-900 border border-neutral-800 px-3 py-1 rounded-full">
                  Duration: {course.duration}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold font-sans text-white tracking-tight leading-tight">
                {course.title}
              </h1>

              <p className="mt-4 text-neutral-300 text-base sm:text-lg leading-relaxed">
                {course.description}
              </p>

              {/* Instructor & Rating Bar */}
              <div className="mt-6 flex flex-wrap items-center gap-6 p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-teal-500 to-emerald-500 flex items-center justify-center font-bold text-neutral-950 text-sm">
                    {course.instructor.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-[11px] text-neutral-400 uppercase font-medium">Instructor</p>
                    <p className="text-sm font-semibold text-white">{course.instructor}</p>
                  </div>
                </div>

                <div className="h-8 w-px bg-neutral-800 hidden sm:block" />

                <div className="flex items-center gap-2">
                  <span className="text-amber-400 text-base">★</span>
                  <span className="font-bold text-sm text-white">{course.rating}</span>
                  <span className="text-xs text-neutral-400">
                    ({course.studentsEnrolled.toLocaleString()} active students)
                  </span>
                </div>
              </div>
            </div>

            {/* What you'll learn / Highlights */}
            <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800/90">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span>✦</span> Course Highlights & Benefits
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {course.highlights?.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-neutral-300">
                    <span className="text-teal-400 font-bold">✓</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Curriculum / Syllabus */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Course Curriculum & Syllabus</h2>
              <p className="text-xs text-neutral-400 mb-6">
                Structured step-by-step master lessons crafted for practical mastery and performance confidence.
              </p>

              <div className="space-y-3">
                {course.syllabus?.map((module, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800 flex items-start gap-4 hover:border-neutral-700 transition"
                  >
                    <div className="h-7 w-7 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 text-xs font-mono font-bold shrink-0 mt-0.5">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white">Module {index + 1}</h3>
                      <p className="text-xs text-neutral-400 mt-0.5">{module}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (Sticky Enrollment Card) */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-neutral-950 border border-neutral-800 rounded-3xl p-6 shadow-2xl space-y-6">
              <div className="overflow-hidden rounded-2xl border border-neutral-800 relative group h-48 w-full">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-xs bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-white border border-white/10 font-medium z-10">
                  Full Program Access
                </span>
              </div>

              <div>
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-3xl font-extrabold text-white">${course.price}</span>
                  <span className="text-xs line-through text-neutral-500">
                    ${(course.price * 1.6).toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-emerald-400 font-medium">Save 38% • One-time payment</p>
              </div>

              {/* Client Component with interactive Enroll Modal & Wishlist toggle */}
              <CourseEnrollClient course={course} />

              <div className="pt-4 border-t border-neutral-800/80 space-y-2.5 text-xs text-neutral-400">
                <div className="flex items-center gap-2">
                  <span className="text-teal-400">🔒</span>
                  <span>30-Day 100% Money-Back Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-teal-400">♾️</span>
                  <span>Lifetime Access to Content & Community</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-teal-400">📱</span>
                  <span>Accessible on Desktop, Tablet & Mobile</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Courses Section */}
        {relatedCourses.length > 0 && (
          <div className="mt-20 pt-12 border-t border-neutral-800">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-white">Recommended Courses</h2>
                <p className="text-xs text-neutral-400 mt-1">Explore other top-rated music programs</p>
              </div>
              <Link
                href="/courses"
                className="text-teal-400 hover:text-teal-300 text-xs font-semibold flex items-center gap-1"
              >
                <span>View All</span>
                <span>→</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedCourses.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/courses/${rel.slug}`}
                  className="group bg-neutral-950 border border-neutral-800 hover:border-teal-500/50 rounded-2xl overflow-hidden p-4 transition duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative w-full h-36 rounded-xl overflow-hidden">
                      <Image
                        src={rel.image}
                        alt={rel.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-[1.02] transition"
                      />
                    </div>
                    <div className="mt-3 flex items-center justify-between text-xs">
                      <span className="text-teal-400 font-medium">{rel.category}</span>
                      <span className="text-neutral-400">★ {rel.rating}</span>
                    </div>
                    <h3 className="text-base font-bold text-white mt-1 group-hover:text-teal-400 transition">
                      {rel.title}
                    </h3>
                    <p className="text-xs text-neutral-400 line-clamp-2 mt-1">{rel.description}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-neutral-800/80 flex justify-between items-center text-xs">
                    <span className="font-bold text-white">${rel.price}</span>
                    <span className="text-teal-400 font-semibold group-hover:translate-x-0.5 transition">
                      Learn More →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
