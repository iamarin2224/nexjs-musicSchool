"use client"

import Link from 'next/link'
import { Button } from './ui/moving-border'

import courseData from "../data/music_courses.json"
import { div } from 'motion/react-client'
import { BackgroundGradient } from './ui/background-gradient'

interface Course{
    id: number,
    title: string,
    slug: string,
    description: string,
    price: number,
    instructor: string,
    isFeatured: boolean,
}

function FeaturedCourses() {

    const featuredCourses = courseData.courses.filter((course:Course) => course.isFeatured)

  return (
    <div className='text-center py-12 bg-gray-950'>
        <div className='text-centre'>
            <h2 className="text-3xl text-blue-500 font-extrabold tracking-wide uppercase" >FEATURED COURSES</h2>
            <p className="mt-2 text-base leading-8 font-semibold tracking-tight text-white sm:text-4xl">Learn with the Best</p>
        </div>

        <div className='mt-15 mx-8'>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center'>
                {featuredCourses.map((course:Course) => (
                    <div key={course.id} className='flex justify-center'>
                        <BackgroundGradient className="flex flex-col rounded-[22px] bg-white dark:bg-zinc-900 overflow-hidden h-full max-w-sm">
                            <div className="p-4 sm:p-6 flex flex-col items-center text-center grow">
                                <p className="text-lg sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">{course.title}</p>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400 grow">{course.description}</p>
                                <Link href={`/courses/${course.slug}`}>
                                Learn More
                                </Link>
                            </div>
                        </BackgroundGradient>
                    </div>
                ))}
            </div>
        </div>

        <div className='mt-15'>
            <Link href={"/courses"}>
                <Button
                    borderRadius="1.75rem"
                    className="bg-white dark:bg-black text-black dark:text-white border-neutral-200 dark:border-slate-800 cursor-pointer"
                >
                    View All Courses
                </Button>
            </Link>
        </div>
    </div>
  )
}

export default FeaturedCourses