import Link from 'next/link';
import { Calendar, ArrowLeft, ChevronRight, Info, Bookmark, Share2, Heart, Thermometer, BadgeHelp, Shapes, Syringe, Clock } from 'lucide-react';
import ScrollReveal from '@/components/ui/scroll-reveal';
import { blogPosts } from '../posts';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

export default function DoloresTatuajePage() {
  // Obtenemos el post actual
  const post = blogPosts.find((post) => post.slug === "duele-hacerse-tatuaje");
  
  // Encontrar posts relacionados (todos excepto el actual)
  const relatedPosts = blogPosts
    .filter(p => p.slug !== "duele-hacerse-tatuaje")
    .slice(0, 2); // Mostrar hasta 2 posts relacionados

  // Datos extendidos sobre áreas y niveles de dolor
  const painAreas = [
    {
      area: "Antebrazo",
      painLevel: "Bajo 🟢",
      description: "Una zona carnosa con pocos nervios, ideal para principiantes.",
      notes: "Excelente para primeros tatuajes por su bajo nivel de dolor."
    },
    {
      area: "Hombro",
      painLevel: "Bajo 🟢",
      description: "Zona muscular con pocas terminaciones nerviosas.",
      notes: "Buena opción para tatuajes grandes sin excesivo dolor."
    },
    {
      area: "Espalda baja",
      painLevel: "Medio 🟡",
      description: "Dolor moderado, puede aumentar en la columna vertebral.",
      notes: "La piel tiende a estirarse con el tiempo, considerar el diseño."
    },
    {
      area: "Costillas",
      painLevel: "Alto 🔴",
      description: "Zona muy sensible con poca grasa y muchos nervios.",
      notes: "Recomendado para personas con alta tolerancia al dolor."
    },
    {
      area: "Tobillos y pies",
      painLevel: "Alto 🔴",
      description: "Muy cercano al hueso y con poca amortiguación.",
      notes: "Mayor inflamación y tiempo de curación en esta zona."
    },
    {
      area: "Cuello y cara",
      painLevel: "Muy alto 🔴🔴",
      description: "Extremadamente sensible con muchas terminaciones nerviosas.",
      notes: "Solo para personas con mucha experiencia en tatuajes."
    },
    {
      area: "Interior del brazo",
      painLevel: "Alto 🔴",
      description: "Piel muy fina y sensible con muchos nervios.",
      notes: "La sensación de dolor puede ser intensa pero soportable."
    },
    {
      area: "Pecho",
      painLevel: "Medio-Alto 🟡🔴",
      description: "Varía según la proximidad al esternón y clavículas.",
      notes: "Especialmente doloroso cerca del esternón y las clavículas."
    }
  ];

  const painReductionTips = [
    {
      tip: "Descansa bien antes",
      description: "Duerme lo suficiente la noche anterior para que tu cuerpo esté en óptimas condiciones.",
      icon: <Clock className="h-6 w-6 text-[#be8f52]" />
    },
    {
      tip: "Come adecuadamente",
      description: "No llegues en ayunas y mantén tus niveles de azúcar estables durante la sesión.",
      icon: <Info className="h-6 w-6 text-[#be8f52]" />
    },
    {
      tip: "Evita alcohol y cafeína",
      description: "No consumas alcohol 24h antes ni cafeína el mismo día, pueden aumentar el sangrado y sensibilidad.",
      icon: <Thermometer className="h-6 w-6 text-[#be8f52]" />
    },
    {
      tip: "Hidratación",
      description: "Mantente bien hidratado antes y durante la sesión para que tu piel esté en mejor estado.",
      icon: <Info className="h-6 w-6 text-[#be8f52]" />
    },
    {
      tip: "Crema anestésica",
      description: "Consulta con tu tatuador si recomienda usar crema anestésica para reducir el dolor.",
      icon: <Syringe className="h-6 w-6 text-[#be8f52]" />
    },
    {
      tip: "Técnicas de respiración",
      description: "Respira profundamente y mantén un ritmo constante para relajarte durante el proceso.",
      icon: <Info className="h-6 w-6 text-[#be8f52]" />
    }
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
              <span className="text-[#be8f52] font-medium">¿Duele Hacerse un Tatuaje?</span>
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
                  <blockquote className="pl-6 italic text-xl">
                    "¿Cuánto duele hacerse un tatuaje?"
                  </blockquote>
                  <p className="text-xl font-medium text-gray-700 dark:text-gray-200 leading-relaxed">
                    Esta es una de las preguntas más frecuentes que recibimos en nuestro estudio. La respuesta corta es: <strong>depende</strong>. Vamos a explicarte todo sobre el dolor al tatuarse, según la zona del cuerpo.
                  </p>
                </div>
                
                {/* Caja de factores de dolor */}
                <Card className="mb-8 border-[#be8f52]/10">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <BadgeHelp className="h-5 w-5 text-[#be8f52]" />
                      Factores que influyen en el dolor
                    </CardTitle>
                    <CardDescription>Cada persona experimenta el dolor de manera diferente</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-[#be8f52]/10 rounded-full">
                          <Shapes className="h-5 w-5 text-[#be8f52]" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">Tu tolerancia al dolor</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Varía significativamente entre personas.</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-[#be8f52]/10 rounded-full">
                          <Shapes className="h-5 w-5 text-[#be8f52]" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">El tamaño del tatuaje</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">A mayor duración, mayor fatiga y sensibilidad.</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-[#be8f52]/10 rounded-full">
                          <Syringe className="h-5 w-5 text-[#be8f52]" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">La técnica del tatuador</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Un profesional experimentado minimiza el dolor.</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-[#be8f52]/10 rounded-full">
                          <Syringe className="h-5 w-5 text-[#be8f52]" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">El tipo de aguja</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Diferentes configuraciones para distintos estilos.</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 md:col-span-2">
                        <div className="p-2 bg-[#be8f52]/10 rounded-full">
                          <Shapes className="h-5 w-5 text-[#be8f52]" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">La ubicación del tatuaje</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">El factor más determinante: zonas con más terminaciones nerviosas o cercanas al hueso duelen más.</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Separator className="my-10 bg-gray-200 dark:bg-zinc-800" />
                
                {/* Mapa de dolor */}
                <div className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <Thermometer className="mr-2 h-6 w-6 text-[#be8f52]" />
                    Dolor según zonas del cuerpo
                  </h2>
                  
                  <Tabs defaultValue="table" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="table">Tabla comparativa</TabsTrigger>
                      <TabsTrigger value="cards">Zonas detalladas</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="table" className="mt-6">
                      <Table>
                        <TableCaption>Guía de niveles de dolor por zona del cuerpo</TableCaption>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[200px]">Zona del cuerpo</TableHead>
                            <TableHead>Nivel de dolor</TableHead>
                            <TableHead>Descripción</TableHead>
                            <TableHead>Recomendación</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {painAreas.map((area, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{area.area}</TableCell>
                              <TableCell>{area.painLevel}</TableCell>
                              <TableCell>{area.description}</TableCell>
                              <TableCell>{area.notes}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TabsContent>
                    
                    <TabsContent value="cards" className="mt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {painAreas.slice(0, 6).map((area, index) => (
                          <Card key={index} className="overflow-hidden border-[#be8f52]/10">
                            <CardHeader className={`bg-gradient-to-r ${area.painLevel.includes("🟢") 
                              ? "from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/10" 
                              : area.painLevel.includes("🟡") 
                                ? "from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-900/10" 
                                : "from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/10"}`}>
                              <div className="flex justify-between items-center">
                                <CardTitle className="text-lg text-gray-900 dark:text-white">{area.area}</CardTitle>
                                <span className="text-sm font-medium">{area.painLevel}</span>
                              </div>
                            </CardHeader>
                            <CardContent className="p-4">
                              <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                                {area.description}
                              </p>
                              <p className="text-[#be8f52] text-sm font-medium">
                                {area.notes}
                              </p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
                
                <Separator className="my-10 bg-gray-200 dark:bg-zinc-800" />
                
                {/* Consejos para reducir el dolor */}
                <div className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <Info className="mr-2 h-6 w-6 text-[#be8f52]" />
                    ¿Cómo reducir el dolor?
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {painReductionTips.map((tip, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50 dark:bg-zinc-800/50">
                        <div className="p-2 bg-[#be8f52]/10 rounded-full shrink-0">
                          {tip.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">{tip.tip}</h3>
                          <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">{tip.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Conclusión */}
                <Card className="mb-10 bg-[#be8f52]/5 border-[#be8f52]/10">
                  <CardHeader>
                    <CardTitle>¿Primera vez tatuándote?</CardTitle>
                    <CardDescription>
                      Te guiamos en todo el proceso para que tu experiencia sea lo más cómoda posible
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 dark:text-gray-300">
                      En Saints & Sinners contamos con profesionales experimentados que te aconsejarán sobre la mejor ubicación para tu primer tatuaje, considerando tu tolerancia al dolor y el diseño que deseas. No dudes en consultarnos cualquier duda que tengas sobre el proceso.
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Link 
                      href="/contacto" 
                      className="px-5 py-2 bg-[#be8f52] text-black font-medium rounded-md hover:bg-[#be8f52]/90 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      Consulta gratis
                    </Link>
                  </CardFooter>
                </Card>
                
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