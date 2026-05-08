import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, ArrowLeft, ChevronRight, Bookmark } from 'lucide-react';
import ScrollReveal from '@/components/ui/scroll-reveal';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import JsonLd from '@/components/json-ld';
import RelatedCta from '@/components/blog/related-cta';
import TLDR from '@/components/tldr';
import { BlogPortableText } from '@/components/blog/portable-text';
import { buildMetadata } from '@/lib/seo';
import { blogPostingSchema, breadcrumbSchema } from '@/lib/schema';
import { sanityFetch } from '@/sanity/lib/fetch';
import {
  postBySlugQuery,
  postSlugsQuery,
  relatedPostsQuery,
} from '@/sanity/lib/queries';
import { urlForImage } from '@/sanity/lib/image';
import type { Post, RelatedPost } from '@/sanity/lib/types';

export const revalidate = 60;
export const dynamicParams = true;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>(postSlugsQuery, {
    tags: ['post'],
  });
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = await sanityFetch<Post | null>(postBySlugQuery, {
    params: { slug },
    tags: ['post', `post:${slug}`],
  });

  if (!post) {
    return { title: 'Post no encontrado', robots: { index: false } };
  }

  const coverUrl = post.coverImage?.asset
    ? urlForImage(post.coverImage).width(1200).height(630).url()
    : undefined;

  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    type: 'article',
    publishedTime: post.publishedAt,
    modifiedTime: post._updatedAt,
    image: coverUrl,
    ogTitle: post.title,
    ogKicker: 'Blog · Saints & Sinners Tattoo',
    mdSlug: `blog/${post.slug}`,
    keywords: post.keywords,
  });
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  const [post, related] = await Promise.all([
    sanityFetch<Post | null>(postBySlugQuery, {
      params: { slug },
      tags: ['post', `post:${slug}`],
    }),
    sanityFetch<RelatedPost[]>(relatedPostsQuery, {
      params: { slug },
      tags: ['post'],
    }),
  ]);

  if (!post) notFound();

  const coverUrl = post.coverImage?.asset
    ? urlForImage(post.coverImage).width(1600).url()
    : undefined;

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-zinc-950 dark:to-zinc-950/80 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="pattern-diagonal-post"
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
          <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-diagonal-post)" />
        </svg>
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/80 to-white dark:via-zinc-950/80 dark:to-zinc-950" />

      <JsonLd
        id="ld-article"
        data={blogPostingSchema({
          title: post.title,
          description: post.excerpt,
          slug: post.slug,
          datePublished: post.publishedAt,
          dateModified: post._updatedAt,
          image: coverUrl,
        })}
      />
      <JsonLd
        id="ld-breadcrumb-post"
        data={breadcrumbSchema([
          { name: 'Inicio', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal direction="up">
            <div className="flex items-center space-x-2 mb-8 text-sm text-gray-500 dark:text-gray-400">
              <Link href="/" className="hover:text-[#be8f52] transition-colors">
                Inicio
              </Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-[#be8f52] transition-colors">
                Blog
              </Link>
              <span>/</span>
              <span className="text-[#be8f52] font-medium line-clamp-1">
                {post.title}
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <article className="bg-white dark:bg-zinc-900 rounded-xl shadow-md border border-transparent overflow-hidden relative">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#be8f52]/30 via-[#be8f52] to-[#be8f52]/30" />

              {coverUrl && (
                <div className="relative aspect-[16/7] bg-zinc-900">
                  <Image
                    src={coverUrl}
                    alt={post.coverImage?.alt ?? post.title}
                    fill
                    sizes="(min-width: 1024px) 896px, 100vw"
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              <div className="relative bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 p-8 overflow-hidden">
                <div className="absolute -bottom-20 -right-20 h-64 w-64 bg-[#be8f52]/20 rounded-full blur-3xl" />
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 relative z-10">
                  {post.title}
                </h1>
                <div className="flex items-center text-sm text-gray-300 relative z-10">
                  <Calendar size={14} className="mr-2 text-[#be8f52]" />
                  <time dateTime={post.publishedAt}>
                    {formatDate(post.publishedAt)}
                  </time>
                </div>
              </div>

              <div className="p-6 md:p-10">
                <TLDR>{post.excerpt}</TLDR>

                <div className="mt-8">
                  <BlogPortableText value={post.body} />
                </div>

                <RelatedCta
                  servicesAnchor="tatuajes"
                  servicesLabel="Tatuajes personalizados en Madrid"
                />

                <Separator className="my-8 bg-gray-200 dark:bg-zinc-800" />

                <div className="flex items-center justify-between">
                  <Link
                    href="/blog"
                    className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-[#be8f52] dark:hover:text-[#be8f52] group transition-colors duration-300"
                  >
                    <ArrowLeft
                      size={16}
                      className="mr-2 group-hover:-translate-x-1 transition-transform duration-300"
                    />
                    Volver al blog
                  </Link>
                </div>
              </div>
            </article>
          </ScrollReveal>

          {related.length > 0 && (
            <div className="mt-16">
              <ScrollReveal direction="up" delay={0.2}>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                  <Bookmark size={18} className="mr-2 text-[#be8f52]" />
                  Artículos relacionados
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  {related.map((p) => (
                    <Link key={p._id} href={`/blog/${p.slug}`}>
                      <Card className="border-transparent hover:border-[#be8f52]/20 hover:shadow-md transition-all duration-300 h-full">
                        <CardHeader>
                          <CardTitle className="group-hover:text-[#be8f52] transition-colors duration-300">
                            {p.title}
                          </CardTitle>
                          <CardDescription>
                            {formatDate(p.publishedAt)}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
                            {p.excerpt}
                          </p>
                        </CardContent>
                        <CardFooter>
                          <div className="flex items-center text-[#be8f52] text-sm font-medium">
                            Leer artículo
                            <ChevronRight size={14} className="ml-1" />
                          </div>
                        </CardFooter>
                      </Card>
                    </Link>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
