import Link from 'next/link'
import { Button } from './ui/moving-border'
import { HoverEffect } from "./ui/card-hover-effect";

export const webinars = [
  {
    title: "Mastering Guitar Fundamentals",
    description:
      "Build a strong foundation in guitar playing by focusing on posture, technique, rhythm, and essential music theory. Ideal for beginners and self-taught players looking to refine their fundamentals.",
    link: "/webinars/mastering-guitar-fundamentals",
  },
  {
    title: "Advanced Vocal Techniques",
    description:
      "Learn professional vocal techniques including breath control, range expansion, tone shaping, and vocal health. Designed for singers aiming to elevate their performance level.",
    link: "/webinars/advanced-vocal-techniques",
  },
  {
    title: "Music Theory for Modern Musicians",
    description:
      "Understand the core principles of music theory and how to apply them practically across genres. This webinar focuses on scales, harmony, chord progressions, and musical structure.",
    link: "/webinars/music-theory-for-modern-musicians",
  },
  {
    title: "Introduction to Music Production",
    description:
      "Get started with music production by learning about DAWs, basic recording techniques, sound design, and workflow essentials for producing professional-quality tracks.",
    link: "/webinars/introduction-to-music-production",
  },
  {
    title: "Mixing & Sound Engineering Essentials",
    description:
      "Explore the fundamentals of mixing, EQ, compression, and spatial effects to create balanced and polished tracks. Perfect for aspiring producers and engineers.",
    link: "/webinars/mixing-and-sound-engineering-essentials",
  },
  {
    title: "Building a Career in Music",
    description:
      "Gain insights into the music industry, branding, performance opportunities, and long-term career strategies from experienced professionals.",
    link: "/webinars/building-a-career-in-music",
  },
];


function UpcomingWebinars() {
  return (
    <div className='py-12 bg-gray-950'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 text-center'>

            <div className='text-centre'>
                <h2 className="text-3xl text-blue-500 font-extrabold tracking-wide uppercase" >FEATURED WEBINARS</h2>
                <p className="mt-2 text-base leading-8 font-semibold tracking-tight text-white sm:text-4xl">Enhance Your Musical Journey</p>
            </div>

            <div className='mt-5'>
                <HoverEffect items={webinars} />
            </div>

            <div className='mt-5 text-center'>
                <Link href={"/webinar"}>
                    <Button
                        borderRadius="1.75rem"
                        className="bg-white dark:bg-black text-black dark:text-white border-neutral-200 dark:border-slate-800 cursor-pointer"
                    >
                        View All Webinars
                    </Button>
                </Link>
            </div>

        </div>
    </div>
  )
}

export default UpcomingWebinars