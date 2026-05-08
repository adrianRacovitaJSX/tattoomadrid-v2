import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ui/scroll-reveal';
import JsonLd from '@/components/json-ld';
import { buildMetadata } from '@/lib/seo';
import { breadcrumbSchema } from '@/lib/schema';
import { sanityFetch } from '@/sanity/lib/fetch';
import { postsListQuery } from '@/sanity/lib/queries';
import { urlForImage } from '@/sanity/lib/image';
import type { PostListItem } from '@/sanity/lib/types';

export const revalidate = 60;

export const metadata = buildMetadata({
  title: 'Blog de Tatuajes — Tendencias, Cuidados y Consejos de Saints & Sinners',
  description:
    'Artículos sobre tendencias en tatuajes, cuidados post-tatuaje, dolor por zona y consejos del equipo de Saints & Sinners Tattoo Madrid.',
  path: '/blog',
  ogTitle: 'Blog de Saints & Sinners Tattoo Madrid',
  ogKicker: 'Tendencias · Cuidados · Consejos',
  mdSlug: 'blog',
  keywords: [
    'blog tatuajes Madrid',
    'tendencias tatuajes',
    'cuidar tatuaje',
    'dolor tatuaje',
  ],
});

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function BlogPage() {
  const posts = await sanityFetch<PostListItem[]>(postsListQuery, {
    tags: ['post', 'blog-list'],
  });

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-zinc-950 dark:to-zinc-950/80 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="pattern-diagonal"
              x="0"
              y="0"
              width="16"
              height="16"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <line
                x1="0"
                y1="8"
                x2="16"
                y2="8"
                stroke="currentColor"
                strokeWidth="1"
                className="text-[#be8f52]"
              />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-diagonal)" />
        </svg>
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/80 to-white dark:via-zinc-950/80 dark:to-zinc-950" />

      <div className="absolute top-0 right-0 w-80 h-80">
        <svg
          className="w-full h-full opacity-20"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="currentColor" className="text-[#be8f52]">
            {[...Array(10)].map((_, y) =>
              [...Array(10)].map((_, x) => (
                <circle key={`${x}-${y}`} cx={x * 10 + 5} cy={y * 10 + 5} r="1" />
              ))
            )}
          </g>
        </svg>
      </div>

      <JsonLd
        id="ld-breadcrumb-blog"
        data={breadcrumbSchema([
          { name: 'Inicio', path: '/' },
          { name: 'Blog', path: '/blog' },
        ])}
      />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <ScrollReveal direction="up" className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Nuestro <span className="text-[#be8f52]">Blog</span>
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg">
            Descubre las últimas tendencias y consejos sobre tatuajes
          </p>
          <div className="h-1 w-20 bg-[#be8f52]/30 mx-auto mt-6" />
        </ScrollReveal>

        {posts.length === 0 ? (
          <ScrollReveal direction="up" className="max-w-xl mx-auto text-center mt-16">
            <p className="text-gray-600 dark:text-gray-300">
              Pronto publicaremos los primeros artículos. Vuelve pronto.
            </p>
          </ScrollReveal>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-12">
            {posts.map((post, index) => (
              <ScrollReveal key={post._id} delay={index * 0.1} direction="up">
                <article className="bg-white dark:bg-zinc-900 rounded-xl shadow-md border border-transparent hover:border-[#be8f52]/20 transition-all duration-300 group relative overflow-hidden h-full flex flex-col">
                  <div className="absolute -top-10 -right-10 h-20 w-20 bg-[#be8f52]/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {post.coverImage?.asset && (
                    <Link
                      href={`/blog/${post.slug}`}
                      className="relative aspect-video bg-gray-100 dark:bg-zinc-800 overflow-hidden"
                    >
                      <Image
                        src={urlForImage(post.coverImage).width(800).height(450).url()}
                        alt={post.coverImage.alt ?? post.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>
                  )}

                  <div className="p-6 md:p-8 flex flex-col flex-grow">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 group-hover:text-[#be8f52] transition-colors duration-300">
                      {post.title}
                    </h2>

                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <Calendar size={14} className="mr-2 text-[#be8f52]" />
                      <time dateTime={post.publishedAt}>
                        {formatDate(post.publishedAt)}
                      </time>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 mb-8 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="mt-auto pt-4 border-t border-gray-100 dark:border-zinc-800">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center text-[#be8f52] font-medium hover:underline"
                      >
                        Leer más
                        <ArrowRight
                          size={16}
                          className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
                        />
                      </Link>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
