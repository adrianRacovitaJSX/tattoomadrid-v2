import { blogPosts } from './posts';
import Link from 'next/link';
import ScrollReveal from '@/components/ui/scroll-reveal';
import { Calendar, ArrowRight } from 'lucide-react';

export default function BlogPage() {
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
      
      {/* Puntos decorativos */}
      <div className="absolute top-0 right-0 w-80 h-80">
        <svg className="w-full h-full opacity-20" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <g fill="currentColor" className="text-[#be8f52]">
            {[...Array(10)].map((_, y) => (
              [...Array(10)].map((_, x) => (
                <circle key={`${x}-${y}`} cx={x * 10 + 5} cy={y * 10 + 5} r="1" />
              ))
            ))}
          </g>
        </svg>
      </div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <ScrollReveal direction="up" className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Nuestro <span className="text-[#be8f52]">Blog</span>
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg">
            Descubre las últimas tendencias y consejos sobre tatuajes
          </p>
          <div className="h-1 w-20 bg-[#be8f52]/30 mx-auto mt-6"></div>
        </ScrollReveal>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {blogPosts.map((post, index) => (
            <ScrollReveal key={post.id} delay={index * 0.1} direction="up">
              <article className="bg-white dark:bg-zinc-900 rounded-xl shadow-md border border-transparent hover:border-[#be8f52]/20 transition-all duration-300 group relative overflow-hidden h-full">
                {/* Elemento decorativo */}
                <div className="absolute -top-10 -right-10 h-20 w-20 bg-[#be8f52]/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="p-6 md:p-8">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 group-hover:text-[#be8f52] transition-colors duration-300">
                    {post.title}
                  </h2>
                  
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <Calendar size={14} className="mr-2 text-[#be8f52]" />
                    <time>
                      {new Date(post.date).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-8">
                    {post.content.split('\n')[0]}...
                  </p>
                  
                  <div className="mt-auto pt-4 border-t border-gray-100 dark:border-zinc-800">
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-[#be8f52] font-medium hover:underline"
                    >
                      Leer más
                      <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
