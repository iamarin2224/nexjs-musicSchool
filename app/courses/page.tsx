"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import courseData from "@/data/music_courses.json";
import { useWishlist } from "@/lib/useWishlist";

interface Course {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: number;
  instructor: string;
  category: string;
  level: string;
  duration: string;
  rating: number;
  studentsEnrolled: number;
  isFeatured: boolean;
  image: string;
  syllabus: string[];
  highlights: string[];
}

const CATEGORIES = ["All", "Strings", "Keys", "Vocals", "Percussion", "Production", "Theory"];
const LEVELS = ["All Levels", "Beginner", "Intermediate", "Advanced"];

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating" | "name">("featured");

  const { wishlist, toggleWishlist, isWishlisted, isLoaded } = useWishlist();

  const courses = courseData.courses as Course[];

  const filteredCourses = useMemo(() => {
    return courses
      .filter((course) => {
        const matchesSearch =
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory =
          selectedCategory === "All" || course.category === selectedCategory;

        const matchesLevel =
          selectedLevel === "All Levels" || course.level === selectedLevel || course.level === "All Levels";

        const matchesWishlist = !showSavedOnly || wishlist.includes(course.id);

        return matchesSearch && matchesCategory && matchesLevel && matchesWishlist;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "name") return a.title.localeCompare(b.title);
        // default: featured first, then id
        if (a.isFeatured === b.isFeatured) return a.id - b.id;
        return a.isFeatured ? -1 : 1;
      });
  }, [courses, searchQuery, selectedCategory, selectedLevel, showSavedOnly, wishlist, sortBy]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedLevel("All Levels");
    setShowSavedOnly(false);
    setSortBy("featured");
  };

  return (
    <div className="min-h-screen bg-black py-12 pt-32 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-10">
        <h1 className="text-3xl md:text-6xl font-sans font-bold text-white tracking-tight">
          Explore All Courses
        </h1>
        <p className="mt-3 text-neutral-400 text-sm md:text-base max-w-2xl mx-auto">
          Discover comprehensive musical masterclasses led by world-class educators and industry pioneers.
        </p>
      </div>

      {/* Filter & Search Bar Controls */}
      <div className="max-w-6xl mx-auto mb-10 space-y-6">
        {/* Search & Sort Row */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-neutral-900/60 p-4 rounded-2xl border border-neutral-800 backdrop-blur-sm">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <svg
              className="absolute left-3.5 top-3.5 h-5 w-5 text-neutral-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses, instructors, keywords..."
              className="w-full pl-11 pr-4 py-2.5 bg-neutral-950 text-white rounded-xl border border-neutral-700 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all placeholder:text-neutral-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-3 text-neutral-500 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Wishlist toggle & Sort Dropdown */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
            <button
              onClick={() => setShowSavedOnly(!showSavedOnly)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium border transition cursor-pointer ${
                showSavedOnly
                  ? "bg-rose-500/20 text-rose-300 border-rose-500/50"
                  : "bg-neutral-950 text-neutral-400 border-neutral-700 hover:text-white"
              }`}
            >
              <span>{showSavedOnly ? "❤️" : "🤍"}</span>
              <span>Saved ({isLoaded ? wishlist.length : 0})</span>
            </button>

            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-neutral-400 text-xs sm:text-sm whitespace-nowrap">
                Sort:
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) =>
                  setSortBy(
                    e.target.value as "featured" | "price-asc" | "price-desc" | "rating" | "name"
                  )
                }
                className="bg-neutral-950 text-white border border-neutral-700 rounded-xl px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-teal-500 cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="rating">Highest Rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Title (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Categories & Level Tabs */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {/* Category Chips */}
          <div className="flex flex-wrap gap-2 items-center">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  selectedCategory === category
                    ? "bg-teal-500 text-black font-semibold shadow-md shadow-teal-500/20"
                    : "bg-neutral-900 text-neutral-300 hover:bg-neutral-800 border border-neutral-800"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Level Filter */}
          <div className="flex items-center gap-2">
            <span className="text-neutral-500 text-xs">Level:</span>
            <div className="flex gap-1 bg-neutral-900 p-1 rounded-xl border border-neutral-800">
              {LEVELS.map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`px-2.5 py-1 rounded-lg text-xs transition-all cursor-pointer ${
                    selectedLevel === level
                      ? "bg-neutral-800 text-white font-medium shadow-sm"
                      : "text-neutral-400 hover:text-neutral-200"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Counter / Active Filters */}
        <div className="flex justify-between items-center text-xs text-neutral-400 px-1">
          <span>
            Showing <strong className="text-white">{filteredCourses.length}</strong> of{" "}
            {courses.length} courses
          </span>
          {(searchQuery || selectedCategory !== "All" || selectedLevel !== "All Levels" || showSavedOnly || sortBy !== "featured") && (
            <button
              onClick={resetFilters}
              className="text-teal-400 hover:text-teal-300 underline cursor-pointer"
            >
              Reset all filters
            </button>
          )}
        </div>
      </div>

      {/* Course Cards Grid */}
      {filteredCourses.length === 0 ? (
        <div className="text-center py-20 bg-neutral-900/30 rounded-3xl border border-neutral-800/80 max-w-xl mx-auto my-8">
          <p className="text-xl text-neutral-300 font-semibold mb-2">No courses match your criteria</p>
          <p className="text-sm text-neutral-500 mb-6">
            {showSavedOnly
              ? "You haven't bookmarked any courses yet. Click the heart icon on any card to save it!"
              : "Try adjusting your search terms or resetting the selected filters."}
          </p>
          <button
            onClick={resetFilters}
            className="px-5 py-2.5 bg-teal-500 text-black font-semibold text-sm rounded-xl hover:bg-teal-400 transition cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {filteredCourses.map((course) => {
            const saved = isWishlisted(course.id);
            return (
              <CardContainer className="inter-var w-full max-w-[24rem]" key={course.id}>
                <CardBody className="bg-neutral-950 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] border-neutral-800 w-full h-auto rounded-2xl p-6 border flex flex-col justify-between">
                  <div>
                    {/* Category, Rating & Bookmark Button */}
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-semibold uppercase tracking-wider text-teal-400 bg-teal-950/60 border border-teal-800/40 px-2.5 py-0.5 rounded-md">
                        {course.category}
                      </span>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-xs text-amber-400">
                          <span>★</span>
                          <span className="font-semibold text-white">{course.rating}</span>
                          <span className="text-neutral-500">({course.studentsEnrolled})</span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleWishlist(course.id);
                          }}
                          aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
                          className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                            saved
                              ? "bg-rose-500/20 border-rose-500/50 text-rose-400 scale-110"
                              : "bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white"
                          }`}
                        >
                          <svg
                            className="w-4 h-4"
                            fill={saved ? "currentColor" : "none"}
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Title */}
                    <CardItem
                      translateZ="50"
                      className="text-xl font-bold text-white group-hover/card:text-teal-400 transition-colors"
                    >
                      {course.title}
                    </CardItem>

                    {/* Instructor */}
                    <p className="text-xs text-neutral-400 mt-1">
                      By <span className="text-neutral-200">{course.instructor}</span> • {course.duration} • {course.level}
                    </p>

                    {/* Description */}
                    <CardItem
                      as="p"
                      translateZ="60"
                      className="text-neutral-400 text-xs line-clamp-2 mt-3"
                    >
                      {course.description}
                    </CardItem>

                    {/* Image with next/image */}
                    <CardItem translateZ="100" className="w-full mt-4">
                      <div className="relative h-44 w-full rounded-xl overflow-hidden group-hover/card:shadow-xl">
                        <Image
                          src={course.image}
                          alt={course.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-all"
                        />
                      </div>
                    </CardItem>
                  </div>

                  {/* Footer Action */}
                  <div className="flex justify-between items-center mt-6 pt-4 border-t border-neutral-800/80">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-neutral-500 uppercase font-medium">Tuition</span>
                      <span className="text-lg font-extrabold text-white">${course.price}</span>
                    </div>

                    <CardItem
                      translateZ={20}
                      as={Link}
                      href={`/courses/${course.slug}`}
                      className="px-4 py-2 rounded-xl bg-white text-black hover:bg-neutral-200 text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
                    >
                      <span>View Details</span>
                      <span>→</span>
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>
            );
          })}
        </div>
      )}
    </div>
  );
}