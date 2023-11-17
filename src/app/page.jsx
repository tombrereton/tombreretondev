/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Button } from '@/components/Button'
import { Card } from '@/components/Card'
import { Container } from '@/components/Container'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
} from '@/components/SocialIcons'
import logoAirbnb from '@/images/logos/airbnb.svg'
import logoFacebook from '@/images/logos/facebook.svg'
import logoPlanetaria from '@/images/logos/planetaria.svg'
import logoStarbucks from '@/images/logos/starbucks.svg'
import image1 from '@/images/photos/image-1.jpg'
import image2 from '@/images/photos/image-2.jpg'
import image3 from '@/images/photos/image-3.jpg'
import image4 from '@/images/photos/image-4.jpg'
import image5 from '@/images/photos/image-5.jpg'
import { getAllArticles } from '@/lib/articles'
import { formatDate } from '@/lib/formatDate'

function Article({ article }) {
  return (
    <Card as="article">
      <Card.Title href={`/blog/${article.slug}`}>
        {article.title}
      </Card.Title>
      <Card.Eyebrow as="time" dateTime={article.date} decorate>
        {formatDate(article.date)}
      </Card.Eyebrow>
      <Card.Description>{article.description}</Card.Description>
      <Card.Cta>Read article</Card.Cta>
    </Card>
  )
}

function SocialLink({ icon: Icon, ...props }) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
  )
}


function ProjectSummary({ summary }) {
  return (
    <li className="flex gap-4">
      <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
        <Image src={summary.logo} alt="" className="h-7 w-7" unoptimized />
      </div>
      <dl className="flex flex-auto flex-wrap gap-x-2">
        <dt className="sr-only">Title</dt>
        <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
          {summary.title}
        </dd>
        <dt className="sr-only">Description</dt>
        <dd className="text-xs text-zinc-500 dark:text-zinc-400">
          {summary.description}
        </dd>
      </dl>
    </li>
  )
}

function Projects() {
  let projects = [
    {
      title: 'Planetaria',
      description: 'CEO',
      logo: logoPlanetaria,
    },
    {
      title: 'Airbnb',
      description: 'Product Designer',
      logo: logoAirbnb,
    },
    {
      title: 'Facebook',
      description: 'iOS Software Engineer',
      logo: logoFacebook,
    },
  ]

  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <ol className=" space-y-8">
        {projects.map((project, roleIndex) => (
          <ProjectSummary key={roleIndex} summary={project} />
        ))}
      </ol>
      <Button href="/projects" variant="secondary" className="group mt-8 w-full">
        See More
      </Button>
    </div>
  )
}

function Photos() {
  let rotations = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2']

  return (
    <div className="mt-16 sm:mt-20">
      <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
        {[image1, image2, image3, image4, image5].map((image, imageIndex) => (
          <div
            key={image.src}
            className={clsx(
              'relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl',
              rotations[imageIndex % rotations.length],
            )}
          >
            <Image
              src={image}
              alt=""
              sizes="(min-width: 640px) 18rem, 11rem"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}


function Divider(props) {
  return (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-zinc-600 dark:border-zinc-400" />
      </div>
      <div className="relative flex justify-start">
        <span className="bg-white dark:bg-zinc-900 pr-3 text-base font-semibold leading-6 text-zinc-600 dark:text-zinc-400">{props.title}</span>
      </div>
    </div>
  )
}

export default async function Home() {
  let articles = (await getAllArticles()).slice(0, 2)

  return (
    <>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            Designer, Creator,<br/>Software Engineer
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            Hi I’m Tom, a software engineer based in Sydney. I specialise in cloud native software development with some recent projects
            constructed using .NET, Terraform and React. In my spare time I also enjoy designing and building things - check out my projects page for what I've been working on.
          </p>
          <div className="mt-6 flex gap-6">
            <SocialLink
              href="https://github.com/tombrereton"
              aria-label="Follow on GitHub"
              icon={GitHubIcon}
            />
            <SocialLink
              href="https://www.linkedin.com/in/tbrereton/"
              aria-label="Follow on LinkedIn"
              icon={LinkedInIcon}
            />
          </div>
        </div>
      </Container>
      {/* <Photos /> */}
      <Container className="mt-16 md:mt-28">
        <div className="grid grid-cols-1 max-w-xl gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-16 xl:pr-24">
            <Divider title="Projects" />
            <Projects />
            {/* <Newsletter /> */}
            {/* <Resume /> */}
          </div>
          <div>
            <Divider title="Blog" />
            <div className="flex flex-col gap-16">
              {articles.map((article) => (
                <Article key={article.slug} article={article} />
              ))}
              {/* <Blog /> */}
            </div>
            <Button href="/blog" variant="secondary" className="group w-full mt-8">
              See More Posts
            </Button>

          </div>
        </div>
      </Container>
    </>
  )
}
