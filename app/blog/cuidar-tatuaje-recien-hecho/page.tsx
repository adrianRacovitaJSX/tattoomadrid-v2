import Link from 'next/link';
import { Calendar, ArrowLeft, ChevronRight, Info, Bookmark, Share2, Heart, Ban, Clock, ShieldCheck, Droplets, Zap, Check, AlertTriangle } from 'lucide-react';
import ScrollReveal from '@/components/ui/scroll-reveal';
import { blogPosts } from '../posts';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

export default function CuidadosTatuajePage() {
  // Obtenemos el post actual
  const post = blogPosts.find((post) => post.slug === "cuidar-tatuaje-recien-hecho");
  
  // Encontrar posts relacionados (todos excepto el actual)
  const relatedPosts = blogPosts
    .filter(p => p.slug !== "cuidar-tatuaje-recien-hecho")
    .slice(0, 2); // Mostrar hasta 2 posts relacionados

  // Datos extendidos sobre fases de curación
  const healingPhases = [
    {
      phase: "Día 1",
      title: "Después de la sesión",
      description: "Al terminar el tatuaje, comienza una fase inflamatoria leve. El tatuador protegerá tu tatuaje y te dará instrucciones iniciales.",
      steps: [
        "El tatuador limpiará la zona y colocará un film transparente o parche específico",
        "Déjalo al menos 2-4 horas (o según las indicaciones específicas si es un parche especial)",
        "Lava con agua templada y jabón neutro, sin frotar",
        "Seca con una toalla limpia a toques suaves (nunca frotar)",
        "Aplica una capa fina de crema cicatrizante (tipo Bepanthol Tattoo o específica)"
      ],
      tips: "La primera noche, puede que manches la ropa o sábanas. Considera usar ropa vieja para dormir.",
      color: "blue"
    },
    {
      phase: "Días 2-4",
      title: "Limpieza y crema",
      description: "El tatuaje estará inflamado y puede supurar un poco. Es el momento más crítico para prevenir infecciones.",
      steps: [
        "Lava 2-3 veces al día con jabón neutro",
        "Aplica crema tras cada lavado en capa muy fina",
        "No te rasques aunque pique (es normal que comience el picor)",
        "Evita sol, piscina, gimnasio y actividades que te hagan sudar"
      ],
      tips: "Usar ropa holgada que no roce el tatuaje. Evitar dormir encima del tatuaje.",
      color: "green"
    },
    {
      phase: "Días 5-10",
      title: "Formación de costras",
      description: "El proceso natural de curación hace que la piel comience a secarse y forme pequeñas costras que contienen exceso de tinta.",
      steps: [
        "Comenzarán a salir pequeñas costras o piel seca: es normal",
        "No las arranques bajo ningún concepto",
        "Sigue aplicando crema, pero no en exceso (capa muy fina)",
        "El tatuaje puede verse opaco o con aspecto polvoriento"
      ],
      tips: "Si notas que las costras se secan demasiado, puedes aumentar ligeramente la frecuencia de hidratación.",
      color: "yellow"
    },
    {
      phase: "Días 11-20",
      title: "Últimos cuidados",
      description: "La fase final de cicatrización, donde las costras caen naturalmente dejando ver el tatuaje final.",
      steps: [
        "Las costras deberían caer solas naturalmente",
        "El color se verá más claro, pero no te preocupes: se irá asentando",
        "Hidrata con una crema suave varias veces al día",
        "Puedes reanudar actividad normal, pero sigue protegiéndolo del sol"
      ],
      tips: "Durante este período, el tatuaje puede parecer opaco o descolorido. Es normal y el color volverá a intensificarse cuando la piel termine de sanar completamente.",
      color: "indigo"
    }
  ];

  // Lo que no debes hacer
  const prohibitedActions = [
    {
      action: "No uses productos inadecuados",
      description: "Alcohol, agua oxigenada o vaselina pueden dañar el tatuaje o retrasar su curación.",
      consequence: "Estos productos pueden resecar la piel, alterar los colores o provocar reacciones adversas.",
      icon: <Ban className="h-8 w-8 text-[#be8f52]" />
    },
    {
      action: "No expongas al sol",
      description: "Evita la exposición directa al sol durante al menos 3-4 semanas.",
      consequence: "El sol puede desvanecer los colores y dañar la piel en proceso de curación, causando manchas o cicatrices.",
      icon: <AlertTriangle className="h-8 w-8 text-[#be8f52]" />
    },
    {
      action: "No rasques ni retires las costras",
      description: "Deja que caigan naturalmente aunque sea tentador quitarlas.",
      consequence: "Arrancar las costras puede extraer la tinta y dejar zonas descoloridas o con cicatrices.",
      icon: <Ban className="h-8 w-8 text-[#be8f52]" />
    },
    {
      action: "No uses ropa ajustada",
      description: "Evita prendas que rocen o se peguen al tatuaje durante la cicatrización.",
      consequence: "La fricción puede irritar la piel, arrancar costras y comprometer la curación.",
      icon: <AlertTriangle className="h-8 w-8 text-[#be8f52]" />
    },
    {
      action: "No te sumerjas en agua",
      description: "Evita piscinas, playas, baños prolongados o saunas durante 2-3 semanas.",
      consequence: "El agua estancada puede contener bacterias que causen infecciones, y el cloro o sal pueden irritar la piel.",
      icon: <Droplets className="h-8 w-8 text-[#be8f52]" />
    }
  ];

  // Señales de alerta
  const warningSignals = [
    { signal: "Enrojecimiento excesivo o que se extiende", severity: "Media-Alta" },
    { signal: "Dolor intenso después de 3 días", severity: "Alta" },
    { signal: "Hinchazón anormal o creciente", severity: "Alta" },
    { signal: "Pus o secreción con mal olor", severity: "Muy Alta" },
    { signal: "Fiebre o malestar general", severity: "Muy Alta" }
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
              <span className="text-[#be8f52] font-medium">Cómo Cuidar tu Tatuaje</span>
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
                    Un buen tatuaje no solo depende del diseño o del tatuador, sino del <strong>cuidado posterior</strong>. Aquí tienes una guía completa para curar tu tatuaje recién hecho, paso a paso, para que cicatrice bien y luzca perfecto.
                  </p>
                </div>
                
                {/* Importancia de los cuidados */}
                <Card className="mb-10 border-[#be8f52]/10">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <ShieldCheck className="h-5 w-5 text-[#be8f52]" />
                      ¿Por qué es importante el cuidado adecuado?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="flex flex-col items-center text-center p-4 rounded-lg bg-gray-50 dark:bg-zinc-800/50">
                        <ShieldCheck className="h-10 w-10 text-[#be8f52] mb-4" />
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Previene infecciones</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">Un tatuaje es una herida abierta que necesita protección para evitar que entren bacterias.</p>
                      </div>
                      <div className="flex flex-col items-center text-center p-4 rounded-lg bg-gray-50 dark:bg-zinc-800/50">
                        <Zap className="h-10 w-10 text-[#be8f52] mb-4" />
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Preserva el diseño</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">Una buena cicatrización asegura que los colores se mantengan vibrantes y las líneas nítidas.</p>
                      </div>
                      <div className="flex flex-col items-center text-center p-4 rounded-lg bg-gray-50 dark:bg-zinc-800/50">
                        <Clock className="h-10 w-10 text-[#be8f52] mb-4" />
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Acelera la recuperación</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">Los cuidados adecuados reducen el tiempo de cicatrización y las molestias.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Fases de curación */}
                <div className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <Clock className="mr-2 h-6 w-6 text-[#be8f52]" />
                    Guía día a día: Fases de curación
                  </h2>
                  
                  <Tabs defaultValue="phase1" className="mb-8">
                    <TabsList className="grid w-full grid-cols-4">
                      {healingPhases.map((phase, index) => (
                        <TabsTrigger key={index} value={`phase${index+1}`}>
                          {phase.phase}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    
                    {healingPhases.map((phase, index) => (
                      <TabsContent key={index} value={`phase${index+1}`} className="mt-6">
                        <Card className="border border-transparent overflow-hidden">
                          <CardHeader className={`bg-gradient-to-r ${
                            phase.color === "blue" ? "from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/10" :
                            phase.color === "green" ? "from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/10" :
                            phase.color === "yellow" ? "from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-900/10" :
                            "from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-900/10"
                          }`}>
                            <CardTitle>{phase.title}</CardTitle>
                            <CardDescription>{phase.phase}</CardDescription>
                          </CardHeader>
                          <CardContent className="pt-6">
                            <p className="text-gray-700 dark:text-gray-300 mb-4">{phase.description}</p>
                            
                            <ul className="space-y-2 mb-4">
                              {phase.steps.map((step, stepIndex) => (
                                <li key={stepIndex} className="flex items-start">
                                  <Check className="h-5 w-5 text-[#be8f52] mr-2 shrink-0 mt-0.5" />
                                  <span className="text-gray-700 dark:text-gray-300">{step}</span>
                                </li>
                              ))}
                            </ul>
                            
                            {phase.tips && (
                              <div className="p-3 bg-[#be8f52]/10 rounded-lg text-sm">
                                <strong className="text-[#be8f52]">Consejo:</strong> {phase.tips}
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </TabsContent>
                    ))}
                  </Tabs>
                  
                  <div className="bg-gray-50 dark:bg-zinc-800/50 p-4 rounded-lg">
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      <strong className="text-[#be8f52]">Importante:</strong> Cada tatuaje puede cicatrizar a un ritmo diferente según la zona del cuerpo, tipo de piel, tamaño y técnica utilizada. Esta guía es orientativa, siempre sigue las indicaciones específicas de tu tatuador.
                    </p>
                  </div>
                </div>
                
                <Separator className="my-10 bg-gray-200 dark:bg-zinc-800" />
                
                {/* Lo que NO debes hacer */}
                <div className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <Ban className="mr-2 h-6 w-6 text-[#be8f52]" />
                    Lo que NO debes hacer
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {prohibitedActions.map((item, index) => (
                      <Card key={index} className="border-[#be8f52]/10">
                        <CardHeader className="flex flex-row items-start gap-4 pb-2">
                          <div className="mt-1">{item.icon}</div>
                          <div>
                            <CardTitle className="text-lg text-gray-900 dark:text-white">{item.action}</CardTitle>
                            <CardDescription className="text-gray-500 dark:text-gray-400">{item.description}</CardDescription>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{item.consequence}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                
                {/* Señales de alerta */}
                <div className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <AlertTriangle className="mr-2 h-6 w-6 text-[#be8f52]" />
                    Señales de alerta
                  </h2>
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Aunque es normal experimentar cierta incomodidad durante los primeros días, debes estar atento a estas señales que pueden indicar complicaciones:
                  </p>
                  
                  <Table>
                    <TableCaption>Si presentas cualquiera de estas señales, consulta con tu tatuador o médico</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Señal de alerta</TableHead>
                        <TableHead>Nivel de urgencia</TableHead>
                        <TableHead>Acción recomendada</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {warningSignals.map((signal, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{signal.signal}</TableCell>
                          <TableCell>{signal.severity}</TableCell>
                          <TableCell>
                            {signal.severity.includes("Alta") 
                              ? "Consulta médica inmediata" 
                              : "Contacta con tu tatuador cuanto antes"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                {/* Conclusión */}
                <Card className="mb-10 bg-[#be8f52]/5 border-[#be8f52]/10">
                  <CardHeader>
                    <CardTitle>¿Dudas sobre el proceso de curación?</CardTitle>
                    <CardDescription>
                      En nuestro estudio te damos instrucciones personalizadas y seguimiento post-tatuaje
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 dark:text-gray-300">
                      El cuidado adecuado de un tatuaje es crucial para asegurar que tu inversión artística perdure en perfectas condiciones. En Saints & Sinners nos preocupamos por tus tatuajes incluso después de que salgas del estudio, por eso ofrecemos seguimiento y asesoramiento durante todo el proceso de curación.
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Link 
                      href="/contacto" 
                      className="px-5 py-2 bg-[#be8f52] text-black font-medium rounded-md hover:bg-[#be8f52]/90 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      Pide asesoramiento
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