import Link from 'next/link';
import { Calendar, ArrowLeft, ChevronRight, TrendingUp, Bookmark, Share2, Heart, Award, Palette, Sparkles, Target, Zap } from 'lucide-react';
import ScrollReveal from '@/components/ui/scroll-reveal';
import { blogPosts } from '../posts';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

export default function TendenciasTatuajesPage() {
  // Obtenemos el post actual
  const post = blogPosts.find((post) => post.slug === "tendencias-tatuajes-2025");
  
  // Encontrar posts relacionados (todos excepto el actual)
  const relatedPosts = blogPosts
    .filter(p => p.slug !== "tendencias-tatuajes-2025")
    .slice(0, 2); // Mostrar hasta 2 posts relacionados

  // Datos extendidos sobre tendencias
  const trendingStyles = [
    {
      id: 1,
      name: "Tatuajes Minimalistas",
      description: "Diseños sencillos, de líneas finas y pequeños detalles que transmiten grandes significados.",
      popularity: "Alta",
      painLevel: "Baja",
      healingTime: "1-2 semanas",
      icon: <Sparkles className="h-8 w-8 text-[#be8f52]" />
    },
    {
      id: 2,
      name: "Neotradicional a Color",
      description: "Evolución del estilo tradicional americano, con colores vibrantes y líneas más definidas.",
      popularity: "Media-Alta",
      painLevel: "Media",
      healingTime: "2-3 semanas",
      icon: <Palette className="h-8 w-8 text-[#be8f52]" />
    },
    {
      id: 3,
      name: "Diseños Astrales",
      description: "Representaciones del cosmos, constelaciones y elementos espirituales relacionados con lo astral.",
      popularity: "Alta",
      painLevel: "Variable",
      healingTime: "2-3 semanas",
      icon: <Sparkles className="h-8 w-8 text-[#be8f52]" />
    },
    {
      id: 4,
      name: "Microrealismo",
      description: "Arte hiperrealista en formato miniatura, con detalles increíblemente precisos.",
      popularity: "Media",
      painLevel: "Media-Alta",
      healingTime: "2-4 semanas",
      icon: <Target className="h-8 w-8 text-[#be8f52]" />
    },
    {
      id: 5,
      name: "Biomecánico/Cyberpunk",
      description: "Fusión de elementos mecánicos y orgánicos, con estética futurista.",
      popularity: "En aumento",
      painLevel: "Alta",
      healingTime: "3-4 semanas",
      icon: <Zap className="h-8 w-8 text-[#be8f52]" />
    },
  ];

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
          {/* Migas de pan */}
          <ScrollReveal direction="up">
            <div className="flex items-center space-x-2 mb-8 text-sm text-gray-500 dark:text-gray-400">
              <Link href="/" className="hover:text-[#be8f52] transition-colors">Inicio</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-[#be8f52] transition-colors">Blog</Link>
              <span>/</span>
              <span className="text-[#be8f52] font-medium">Tendencias en Tatuajes 2025</span>
            </div>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={0.1}>
            <article className="bg-white dark:bg-zinc-900 rounded-xl shadow-md border border-transparent overflow-hidden relative">
              {/* Elemento decorativo superior */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#be8f52]/30 via-[#be8f52] to-[#be8f52]/30"></div>
              
              {/* Cabecera */}
              <div className="relative bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 p-8 overflow-hidden">
                <div className="absolute -bottom-20 -right-20 h-64 w-64 bg-[#be8f52]/20 rounded-full blur-3xl"></div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 relative z-10">{post?.title}</h1>
                <div className="flex items-center text-sm text-gray-300 relative z-10">
                  <Calendar size={14} className="mr-2 text-[#be8f52]" />
                  <time>
                    {post && new Date(post.date).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </div>
              </div>
              
              <div className="p-6 md:p-10">
                {/* Acciones sociales */}
                <div className="flex items-center justify-end mb-8 space-x-4">
                  <button className="p-2 rounded-full bg-gray-100 dark:bg-zinc-800 hover:bg-[#be8f52]/10 transition-colors">
                    <Bookmark size={18} className="text-gray-600 dark:text-gray-300" />
                  </button>
                  <button className="p-2 rounded-full bg-gray-100 dark:bg-zinc-800 hover:bg-[#be8f52]/10 transition-colors">
                    <Share2 size={18} className="text-gray-600 dark:text-gray-300" />
                  </button>
                  <button className="p-2 rounded-full bg-gray-100 dark:bg-zinc-800 hover:bg-[#be8f52]/10 transition-colors">
                    <Heart size={18} className="text-gray-600 dark:text-gray-300" />
                  </button>
                </div>
                
                {/* Introducción */}
                <div className="prose prose-lg max-w-none dark:prose-invert prose-a:text-[#be8f52] prose-blockquote:border-l-[#be8f52] prose-strong:text-[#be8f52] prose-headings:text-gray-900 dark:prose-headings:text-white mb-8">
                  <p className="text-xl font-medium text-gray-700 dark:text-gray-200 leading-relaxed">
                    ¿Estás pensando en hacerte un tatuaje en 2025? Aquí te mostramos los estilos y diseños que están dominando la escena este año. Desde lo minimalista hasta lo maximalista, estas son las tendencias de tatuajes que no querrás perderte.
                  </p>
                </div>
                
                <Separator className="my-8 bg-gray-200 dark:bg-zinc-800" />
                
                {/* Indicador de tendencia */}
                <div className="flex items-center mb-8 p-4 rounded-lg bg-[#be8f52]/10 border border-[#be8f52]/20">
                  <TrendingUp size={24} className="text-[#be8f52] mr-4" />
                  <p className="text-gray-700 dark:text-gray-200">
                    Las tendencias en tatuajes de 2025 muestran una fuerte inclinación hacia diseños con significado personal y un equilibrio entre minimalismo y expresión artística.
                  </p>
                </div>
                
                {/* Tabs para diferentes secciones */}
                <Tabs defaultValue="overview" className="mb-10">
                  <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                    <TabsTrigger value="overview">Visión general</TabsTrigger>
                    <TabsTrigger value="styles">Estilos populares</TabsTrigger>
                    <TabsTrigger value="details">Comparativa</TabsTrigger>
                    <TabsTrigger value="conclusion">Conclusión</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="mt-6">
                    <div className="space-y-8">
                      {trendingStyles.map((style) => (
                        <Card key={style.id} className="overflow-hidden border-[#be8f52]/10 hover:border-[#be8f52]/30 transition-colors">
                          <CardHeader className="flex flex-row items-center gap-4 pb-2">
                            {style.icon}
                            <div>
                              <CardTitle className="text-xl text-gray-900 dark:text-white">{style.name}</CardTitle>
                              <CardDescription className="text-gray-500 dark:text-gray-400">{style.popularity} popularidad en 2025</CardDescription>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-700 dark:text-gray-300">{style.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="styles" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {trendingStyles.map((style) => (
                        <Card key={style.id} className="overflow-hidden border-[#be8f52]/10 hover:border-[#be8f52]/30 transition-colors">
                          <CardHeader className="bg-gradient-to-r from-zinc-100 to-gray-100 dark:from-zinc-800 dark:to-zinc-900">
                            <div className="flex items-center gap-3">
                              {style.icon}
                              <CardTitle className="text-xl text-gray-900 dark:text-white">{style.name}</CardTitle>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-4">
                            <p className="text-gray-700 dark:text-gray-300 mb-3">{style.description}</p>
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <Award size={14} className="mr-1 text-[#be8f52]" />
                              <span>Popularidad: {style.popularity}</span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="details" className="mt-6">
                    <Table>
                      <TableCaption>Comparativa de tendencias en tatuajes para 2025</TableCaption>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[200px]">Estilo</TableHead>
                          <TableHead>Popularidad</TableHead>
                          <TableHead>Nivel de dolor</TableHead>
                          <TableHead className="text-right">Tiempo de curación</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {trendingStyles.map((style) => (
                          <TableRow key={style.id}>
                            <TableCell className="font-medium">{style.name}</TableCell>
                            <TableCell>{style.popularity}</TableCell>
                            <TableCell>{style.painLevel}</TableCell>
                            <TableCell className="text-right">{style.healingTime}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TabsContent>
                  
                  <TabsContent value="conclusion" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>¿Cuál de estas tendencias va más contigo?</CardTitle>
                        <CardDescription>
                          La elección del tatuaje es algo muy personal que debe conectar con tu estilo y personalidad
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                          Si estás buscando ideas o quieres personalizar uno de estos estilos, en nuestro estudio te asesoramos sin compromiso. Nuestros artistas especializados pueden ayudarte a encontrar el diseño perfecto que combine tanto las tendencias actuales como tu visión personal.
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                          Recuerda que más allá de las tendencias, lo más importante es que el tatuaje tenga un significado especial para ti y que te sientas cómodo con él durante muchos años.
                        </p>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Link 
                          href="/contacto" 
                          className="px-5 py-2 bg-[#be8f52] text-black font-medium rounded-md hover:bg-[#be8f52]/90 transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                          Pide tu cita
                        </Link>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                </Tabs>
                
                {/* Separador final */}
                <Separator className="my-8 bg-gray-200 dark:bg-zinc-800" />
                
                {/* Acciones finales */}
                <div className="flex items-center justify-between">
                  <Link 
                    href="/blog"
                    className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-[#be8f52] dark:hover:text-[#be8f52] group transition-colors duration-300"
                  >
                    <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
                    Volver al blog
                  </Link>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Compartir:</span>
                    <button className="p-2 rounded-full bg-gray-100 dark:bg-zinc-800 hover:bg-[#be8f52]/10 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600 dark:text-gray-300">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                      </svg>
                    </button>
                    <button className="p-2 rounded-full bg-gray-100 dark:bg-zinc-800 hover:bg-[#be8f52]/10 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600 dark:text-gray-300">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </ScrollReveal>
          
          {/* Posts relacionados */}
          {relatedPosts.length > 0 && (
            <div className="mt-16">
              <ScrollReveal direction="up" delay={0.2}>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                  <Bookmark size={18} className="mr-2 text-[#be8f52]" />
                  Artículos relacionados
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {relatedPosts.map((relatedPost, index) => (
                    <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                      <Card className="border-transparent hover:border-[#be8f52]/20 hover:shadow-md transition-all duration-300 h-full">
                        <CardHeader>
                          <CardTitle className="group-hover:text-[#be8f52] transition-colors duration-300">
                            {relatedPost.title}
                          </CardTitle>
                          <CardDescription>
                            {new Date(relatedPost.date).toLocaleDateString('es-ES', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
                            {relatedPost.content.split('\n')[0]}
                          </p>
                        </CardContent>
                        <CardFooter>
                          <div className="flex items-center text-[#be8f52] text-sm font-medium">
                            Leer artículo
                            <ChevronRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform duration-300" />
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