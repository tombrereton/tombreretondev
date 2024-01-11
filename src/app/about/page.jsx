import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
} from '@/components/SocialIcons'
import portraitImage from '@/images/avatar.jpg'

function SocialLink({ className, href, children, icon: Icon }) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

export const metadata = {
  title: 'About',
  description:
    'I’m Spencer Sharp. I live in New York City, where I design the future.',
}

export default function About() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src={portraitImage}
              alt=""
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            A little bit about me
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p>As a seasoned Senior/Lead Software Engineer, I've developed a keen expertise in .NET and Microsoft Azure. My passion lies in mastering static typed languages and crafting cloud-native applications. I'm always game for adopting new languages and exploring diverse cloud platforms, making versatility one of my strongest suits.</p>

            <p>In my personal projects, I harness a variety of technologies, including React, JavaScript, Golang, .NET, and Terraform, each chosen to suit the specific needs of the project. My portfolio ranges from playlist generation websites to match-three games. My current focus is on developing a small event management website. These projects, hosted on platforms like Azure, Vercel, and Fly.io, represent my ongoing commitment to exploring and expanding the frontiers of software engineering.</p>

            <p>In my blog, I dive deep into the realms of software design, particularly focusing on designing for testability. I firmly believe in the transformative power of tests in enhancing readability, robustness, and agility of software. My approach is pragmatic, not dogmatic; I advocate for using Test-Driven Development (TDD) where it brings real value, rather than following it blindly. My posts explore technologies that streamline testing and discuss innovative testing strategies, aiming to be a resource for both budding and seasoned developers.</p>

            <p>When I'm not coding or blogging, you'll find me practicing Muay Thai, lifting weights, delving into UI and product design, or getting lost in a good book. My approach to life is much like my approach to software: disciplined, creative, and always striving for improvement.</p>

            <p>What sets me apart? My knack for designing systems through tests, my excellent mentoring skills, and my product-based approach to software design. These qualities not only define my work but also shape how I engage with technology on a broader scale.</p>

            <p>With this knowledge and experience, I'm on a quest to boost small businesses and solo dreamers, turning their 'what-ifs' into 'heck yes'!</p>

          </div>
        </div>
        <div className="lg:pl-20">
          <ul role="list">
            <SocialLink href="https://github.com/tombrereton" icon={GitHubIcon} className="mt-4">
              Follow on GitHub
            </SocialLink>
            <SocialLink href="https://www.linkedin.com/in/tbrereton/" icon={LinkedInIcon} className="mt-4">
              Follow on LinkedIn
            </SocialLink>
            <SocialLink
              href="mailto:mail@tombrereton.dev"
              icon={MailIcon}
              className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
            >
              mail@tombrereton.dev
            </SocialLink>
          </ul>
        </div>
      </div>
    </Container>
  )
}
