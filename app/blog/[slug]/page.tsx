import { blogPosts } from '../posts';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, ArrowLeft, ChevronRight } from 'lucide-react';
import ScrollReveal from '@/components/ui/scroll-reveal';

interface PageParams {
  slug: string;
}

export default function BlogPostPage({ params }: { params: PageParams }) {
  const post = blogPosts.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  // Encontrar posts relacionados (todos excepto el actual)
  const relatedPosts = blogPosts
    .filter(p => p.slug !== params.slug)
    .slice(0, 2); // Mostrar hasta 2 posts relacionados

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-zinc-950 dark:to-zinc-950/80 relative overflow-hidden">
      {/* Fondo con patrón diagonal */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="pattern-diagonal" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="8" x2="16" y2="8" stroke="currentColor" strokeWidth="1" className="text-[#be8f52]"/>
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-diagonal)"></rect>
        </svg>
      </div>
      
      {/* Gradiente */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/80 to-white dark:via-zinc-950/80 dark:to-zinc-950"></div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal direction="up">
            <Link 
              href="/blog"
              className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-[#be8f52] dark:hover:text-[#be8f52] mb-8 group transition-colors duration-300"
            >
              <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
              Volver al blog
            </Link>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={0.1}>
            <article className="bg-white dark:bg-zinc-900 rounded-xl shadow-md border border-transparent overflow-hidden relative">
              {/* Elemento decorativo superior */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#be8f52]/30 via-[#be8f52] to-[#be8f52]/30"></div>
              
              <div className="p-6 md:p-10">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">{post.title}</h1>
                
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-8 border-b border-gray-100 dark:border-zinc-800 pb-6">
                  <Calendar size={16} className="mr-2 text-[#be8f52]" />
                  <time>
                    {new Date(post.date).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </div>
                
                <div className="prose prose-lg max-w-none dark:prose-invert prose-a:text-[#be8f52] prose-blockquote:border-l-[#be8f52] prose-strong:text-[#be8f52] prose-headings:text-gray-900 dark:prose-headings:text-white">
                  {post.content.split('\n\n').map((paragraph, index) => {
                    // Si el párrafo empieza con un emoji o un símbolo especial, lo consideramos un título
                    if (paragraph.match(/^[👉✨🎨🌌🖼️🤖💡🗺️👨‍⚕️📆🚫]/)) {
                      return (
                        <h3 key={index} className="text-xl font-semibold my-6 text-gray-900 dark:text-white">
                          {paragraph}
                        </h3>
                      );
                    }
                    
                    // Párrafos normales
                    return (
                      <p key={index} className="mb-6">
                        {paragraph}
                      </p>
                    );
                  })}
                </div>
              </div>
            </article>
          </ScrollReveal>
          
          {relatedPosts.length > 0 && (
            <div className="mt-16">
              <ScrollReveal direction="up" delay={0.2}>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Artículos relacionados
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {relatedPosts.map((relatedPost, index) => (
                    <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md p-6 border border-transparent hover:border-[#be8f52]/20 transition-all duration-300 group relative overflow-hidden h-full">
                        <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-[#be8f52] transition-colors duration-300">
                          {relatedPost.title}
                        </h4>
                        <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                          {new Date(relatedPost.date).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                        <div className="mt-3 flex items-center text-[#be8f52] text-sm font-medium">
                          Leer artículo
                          <ChevronRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
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