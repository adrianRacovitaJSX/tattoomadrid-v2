"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Instagram, Calendar, Check, X, Award, User } from 'lucide-react';

// Definición de tipos para artistas
interface Artist {
  id: string;
  name: string;
  role: string;
  image: string;
  specialty: string;
  experience: string;
  bio: string;
  instagram?: string;
  styles: string[];
  portfolioImages: string[];
  availability: boolean;
  awards?: string[];
}

const ArtistDetail: React.FC<{ artist: Artist, isOpen: boolean, onClose: () => void }> = ({ artist, isOpen, onClose }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-zinc-900 max-w-3xl w-full max-h-[80vh] overflow-y-auto rounded-xl relative">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 h-8 w-8 flex items-center justify-center rounded-full bg-black/10 dark:bg-white/10 text-gray-700 dark:text-gray-300 hover:bg-black/20 dark:hover:bg-white/20 transition-colors z-10"
        >
          <X size={18} />
        </button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 h-full">
          {/* Imagen del artista */}
          <div className="relative h-[250px] md:h-full overflow-hidden">
            <Image 
              src={artist.image} 
              alt={artist.name}
              fill
              className={`object-cover ${artist.id === 'yury' ? 'filter grayscale hover:grayscale-0 transition-all duration-500' : ''}`} 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h2 className="text-2xl font-bold text-white">{artist.name}</h2>
              <p className="text-[#be8f52]">{artist.role}</p>
              <p className="text-white/70 text-sm">{artist.specialty}</p>
            </div>
          </div>
          
          {/* Información y portfolio */}
          <div className="p-6 h-full flex flex-col">
            <div className="mb-4">
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">Biografía</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{artist.bio}</p>
            </div>
            
            <div className="mb-4">
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">Especialidades</h3>
              <div className="flex flex-wrap gap-2">
                {artist.styles.map((style, index) => (
                  <span key={index} className="bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-gray-200 text-xs px-3 py-1 rounded-full">
                    {style}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">Portfolio</h3>
              <div className="grid grid-cols-2 gap-2">
                {artist.portfolioImages.map((img, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                    <Image 
                      src={img} 
                      alt={`Trabajo de ${artist.name}`}
                      fill
                      className="object-cover" 
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-4">
              {artist.instagram && (
                <Link 
                  href={artist.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                >
                  <Instagram size={18} className="mr-2" />
                  <span>Instagram</span>
                </Link>
              )}
              <Link 
                href={`/contacto?artist=${artist.id}`}
                className="flex-1 inline-flex items-center justify-center bg-[#be8f52] text-white font-medium px-4 py-2 rounded-lg hover:bg-[#be8f52]/90 transition-colors"
              >
                <Calendar size={18} className="mr-2" />
                <span>Reservar cita</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TeamGridSection = () => {
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  
  // Datos detallados de los artistas
  const artists: Artist[] = [
    {
      id: "gamboa",
      name: "Gamboa The Goat",
      role: "Master Tattoo Artist",
      image: "/images/artists/gamboa.webp",
      specialty: "Realismo & Chicano",
      experience: "8 años",
      bio: "Gamboa The Goat es un tatuador con más de 8 años de experiencia, especializado en estilo chicano malandro y realismo en black and grey.",
      instagram: "https://www.instagram.com/gamboa_the_goat/",
      styles: ["Realismo", "Chicano", "Black and Grey", "Malandro"],
      portfolioImages: [
        "/images/portfolio/gamboa-1.webp",
        "/images/portfolio/gamboa-2.webp",
        "/images/portfolio/gamboa-3.webp",
        "/images/portfolio/gamboa-4.webp"
      ],
      availability: true,
      awards: [
        "Mejor Realismo - Convención Madrid Tattoo 2022",
        "Top 10 Artistas Revelación - Inked Magazine 2019",
        "Premio Excelencia Técnica - Barcelona Tattoo Expo 2021"
      ]
    },
    {
      id: "edward",
      name: "Edward Ortiz",
      role: "Tattoo Artist",
      image: "/images/artists/edward.webp",
      specialty: "Neotradicional",
      experience: "8 años",
      bio: "Edward Ortiz es un tatuador especializado en neotradicional a todo color, combinando influencias del tradicional americano y estilo japonés con ilustración, anime y cómic.",
      instagram: "https://www.instagram.com/edwardtattooer/",
      styles: ["Neotradicional", "Color", "Tradicional Americano", "Japonés", "Ilustración", "Anime", "Cómic"],
      portfolioImages: [
        "/images/portfolio/edward-1.webp",
        "/images/portfolio/edward-2.webp",
        "/images/portfolio/edward-3.webp",
        "/images/portfolio/edward-4.webp"
      ],
      availability: true
    },
    {
      id: "airon",
      name: "Airon Broncano",
      role: "Tattoo Artist",
      image: "/images/artists/airon.webp",
      specialty: "Realismo",
      experience: "10 años",
      bio: "Airon Broncano domina el realismo en black and grey y color, con un estilo nítido, detallista y versátil. También es experto en sketchbook y watercolor, creando tatuajes de gran impacto visual.",
      instagram: "https://www.instagram.com/airon_tattoo85/",
      styles: ["Realismo", "Black and Grey", "Color", "Sketchbook", "Watercolor"],
      portfolioImages: [
        "/images/portfolio/airon-1.webp",
        "/images/portfolio/airon-2.webp",
        "/images/portfolio/airon-3.webp",
        "/images/portfolio/airon-4.webp"
      ],
      availability: false,
      awards: [
        "Mejor Tatuaje Japonés - Madrid Tattoo Convention 2023",
        "Premio Artista Internacional - Tokyo Ink Festival 2020"
      ]
    },
    {
      id: "yury",
      name: "Yury Marino",
      role: "Artista Innato",
      image: "/images/artists/yuri.jpg",
      specialty: "Realismo Fine Line y Lettering",
      experience: "5 años",
      bio: "Yury Marino es un artista paciente y perfeccionista con 5 años de experiencia. Su estilo está inspirado por grandes maestros como Van Gogh, Da Vinci y Miguel Ángel. Especializado en tatuajes Realistas, Realismo Fine Line y Lettering, cada pieza que crea es única y detallada.",
      instagram: "https://www.instagram.com/davinci_jp/",
      styles: ["Realismo", "Fine Line", "Lettering", "Realismo a Color"],
      portfolioImages: [
        "/images/artists/yuri-tattoo1.jpg",
        "/images/artists/yuri-tattoo2.jpg",
        "/images/artists/yuri-tattoo3.PNG",
        "/images/artists/yuri-tattoo4.jpg"
      ],
      availability: true
    }
  ];

  // Testimonios reales tomados de testimonials.tsx
  const testimonials = [
    {
      name: "Elena López",
      content: "Ha sido mi primer piercing con ellos. El local estaba muy limpio y Edu, el artista, lo hizo genial. Llevo una semana con la perforación y la cicatrización está siendo impecable. Sin duda recomiendo!",
      rating: 5,
      date: "hace 6 días",
      service: "Piercing en la oreja",
      artistId: "edward"
    },
    {
      name: "Elena López de la Torre",
      content: "Son unos artistas! Sobre todo Gamboa! Es maravilloso, muy cercano y acierta siempre con lo que buscas exactamente al comentarle la idea. 100% recomendable!",
      rating: 5,
      date: "hace 6 días",
      artistId: "gamboa"
    },
    {
      name: "Carlos Chavez",
      content: "Excelente trabajo y totalmente profesionales, me voy satisfecho por la pieza que me realizaron 😎",
      rating: 5,
      date: "Hace un mes",
      artistId: "airon"
    }
  ];
  
  return (
    <section className="py-16 bg-white dark:bg-zinc-950">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {artists.map((artist) => (
            <div 
              key={artist.id} 
              className="group cursor-pointer"
              onClick={() => setSelectedArtist(artist)}
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-gray-100 dark:bg-zinc-900">
                {/* Artista imagen */}
                <Image
                  src={artist.image}
                  alt={artist.name}
                  fill
                  className={`object-cover transition-transform duration-500 group-hover:scale-110 ${artist.id === 'yury' ? 'filter grayscale hover:grayscale-0 transition-all duration-500' : ''}`}
                />
                
                {/* Overlay con información y efecto de borde dorado */}
                <div className="absolute inset-0 border-0 group-hover:border-4 border-[#be8f52] transition-all duration-300 rounded-xl"></div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white">{artist.name}</h3>
                  <p className="text-[#be8f52]">{artist.role}</p>
                  <p className="text-gray-300 text-sm mt-1">{artist.specialty}</p>
                  <p className="text-gray-400 text-xs mt-1">Experiencia: {artist.experience}</p>
                  
                  <div className="mt-4 flex space-x-3">
                    {artist.instagram && (
                      <Link 
                        href={artist.instagram} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-white/70 hover:text-white transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Instagram size={18} />
                      </Link>
                    )}
                    <button 
                      className="text-white/70 hover:text-white transition-colors"
                      onClick={(e) => { 
                        e.stopPropagation();
                        setSelectedArtist(artist);
                      }}
                    >
                      <User size={18} />
                    </button>
                    <Link 
                      href={`/contacto?artist=${artist.id}`}
                      className="text-white/70 hover:text-white transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Calendar size={18} />
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Etiquetas de estilos */}
              <div className="flex flex-wrap gap-1 mt-3">
                {artist.styles.slice(0, 3).map((style, index) => (
                  <span key={index} className="bg-gray-100 dark:bg-zinc-900 text-gray-700 dark:text-gray-300 text-xs px-2 py-0.5 rounded-full">
                    {style}
                  </span>
                ))}
                {artist.styles.length > 3 && (
                  <span className="bg-gray-100 dark:bg-zinc-900 text-gray-700 dark:text-gray-300 text-xs px-2 py-0.5 rounded-full">
                    +{artist.styles.length - 3}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonios de clientes */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Lo que dicen <span className="text-[#be8f52]">nuestros clientes</span></h2>
            <div className="h-1 w-20 bg-[#be8f52]/30 mx-auto mt-6"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => {
              const artist = artists.find(a => a.id === testimonial.artistId);
              
              return (
                <div key={index} className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-md border border-transparent hover:border-[#be8f52]/20 transition-all duration-300 group relative overflow-hidden">
                  {/* Elemento decorativo */}
                  <div className="absolute -top-10 -right-10 h-20 w-20 bg-[#be8f52]/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="flex items-start gap-4 mb-4">
                    {artist && (
                      <div className="relative h-12 w-12 rounded-full overflow-hidden flex-shrink-0">
                        <Image 
                          src={artist.image} 
                          alt={artist.name} 
                          fill 
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                      <div className="flex items-center">
                        {Array(5).fill(0).map((_, i) => (
                          <svg 
                            key={i} 
                            className={`w-4 h-4 ${i < testimonial.rating ? 'text-[#be8f52]' : 'text-gray-300 dark:text-gray-600'}`} 
                            fill={i < testimonial.rating ? 'currentColor' : 'none'}
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                          </svg>
                        ))}
                        {testimonial.date && (
                          <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">{testimonial.date}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <blockquote className="text-gray-600 dark:text-gray-300 italic">"{testimonial.content}"</blockquote>
                  
                  {testimonial.service && (
                    <div className="mt-3 pt-3 border-t border-gray-100 dark:border-zinc-800">
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <Check size={14} className="mr-1 text-[#be8f52]" />
                        <span>Servicio: {testimonial.service}</span>
                      </div>
                    </div>
                  )}
                  
                  {artist && (
                    <div className="mt-3 pt-3 border-t border-gray-100 dark:border-zinc-800">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <span>Artista: <span className="text-[#be8f52]">{artist.name}</span></span>
                        </div>
                        
                        <button 
                          onClick={() => setSelectedArtist(artist)}
                          className="text-xs bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full hover:bg-[#be8f52]/20 hover:text-[#be8f52] transition-colors"
                        >
                          Ver perfil
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          <div className="mt-12 text-center">
            <Link 
              href="https://g.co/kgs/paqKHku" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-[#be8f52] text-white font-medium rounded-lg shadow-lg shadow-[#be8f52]/20 hover:bg-[#be8f52]/90 transition-colors duration-300"
            >
              Ver todas las reseñas
            </Link>
          </div>
        </div>

        {/* Galería de Trabajos */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Galería de <span className="text-[#be8f52]">Trabajos</span></h2>
            <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Explora nuestra colección de trabajos realizados por nuestros talentosos artistas. Descubre diferentes estilos y técnicas.</p>
            <div className="h-1 w-20 bg-[#be8f52]/30 mx-auto mt-6"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {artists.flatMap(artist => 
              artist.portfolioImages.map((img, imgIndex) => (
                <div 
                  key={`${artist.id}-${imgIndex}`} 
                  className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer"
                  onClick={() => setSelectedArtist(artist)}
                >
                  <Image 
                    src={img} 
                    alt={`Trabajo de ${artist.name}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <p className="text-white font-medium">{artist.name}</p>
                    <p className="text-[#be8f52] text-sm">{artist.specialty}</p>
                    <button className="mt-2 text-xs bg-white/20 text-white px-3 py-1 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors">
                      Ver perfil
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Artist Detail Modal */}
        {selectedArtist && (
          <ArtistDetail 
            artist={selectedArtist} 
            isOpen={!!selectedArtist} 
            onClose={() => setSelectedArtist(null)} 
          />
        )}
      </div>
    </section>
  );
};

export default TeamGridSection; 