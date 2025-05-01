"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Instagram, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ui/scroll-reveal';
import TiltedCard from '@/components/ui/tilted-card';
import MagneticButton from '@/components/ui/magnetic-button';

interface ArtistProps {
  name: string;
  role: string;
  image: string;
  specialty: string;
  instagram?: string;
}

const ArtistCard: React.FC<ArtistProps> = ({ name, role, image, specialty, instagram }) => {
  return (
    <TiltedCard 
      tiltStrength={30} 
      glareColor="#be8f52"
      glareOpacity={0.3}
      className="h-full"
      borderColor="#be8f5240"
      borderGradient={true}
    >
      <Link href="/artistas" className="block h-full">
        <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-gray-100 dark:bg-zinc-900 h-full">
          {/* Artista imagen */}
          <Image
            src={image}
            alt={name}
            fill
            className={`object-cover transition-transform duration-500 group-hover:scale-110 ${name === 'Yury Marino' ? 'filter grayscale hover:grayscale-0 transition-all duration-500' : ''}`}
          />
          
          {/* Overlay con información y efecto de borde dorado */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="text-xl font-bold text-white">{name}</h3>
              <p className="text-[#be8f52]">{role}</p>
              <p className="text-gray-300 text-sm mt-1">{specialty}</p>
              
              {instagram && (
                <Link 
                  href={instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center text-white hover:text-[#be8f52] transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Instagram size={16} className="mr-1" />
                  <span className="text-sm">Instagram</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </Link>
    </TiltedCard>
  );
};

const TeamSection = () => {
  const artists = [
    {
      name: "Gamboa The Goat",
      role: "Master Tattoo Artist",
      image: "/images/artists/gamboa.webp",
      specialty: "Realismo y Blackwork",
      instagram: "https://www.instagram.com/gamboa_the_goat/"
    },
    {
      name: "Edward Ortiz",
      role: "Tattoo Artist",
      image: "/images/artists/edward.webp",
      specialty: "Neotradicional y Color",
      instagram: "https://www.instagram.com/edwardtattooer/"
    },
    {
      name: "Airon Broncano",
      role: "Tattoo Artist",
      image: "/images/artists/airon.webp",
      specialty: "Japonés y Geométrico",
      instagram: "https://www.instagram.com/airon_tattoo85/"
    },
    {
      name: "Yury Marino",
      role: "Artista Innato",
      image: "/images/artists/yuri.jpg",
      specialty: "Realismo Fine Line y Lettering",
      instagram: "https://www.instagram.com/davinci_jp/"
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-zinc-950/90 relative overflow-hidden">
      {/* Fondo elegante y discreto */}
      <div className="absolute inset-0 bg-[linear-gradient(60deg,transparent_0%,transparent_40%,rgba(190,143,82,0.04)_60%,rgba(190,143,82,0.06)_100%)]"></div>
      
      {/* Líneas sutiles de decoración */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#be8f52]/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#be8f52]/40 to-transparent"></div>
        <div className="absolute top-0 right-8 w-px h-24 bg-gradient-to-b from-[#be8f52]/40 to-transparent"></div>
        <div className="absolute bottom-0 left-8 w-px h-24 bg-gradient-to-t from-[#be8f52]/40 to-transparent"></div>
      </div>
      
      {/* Resplandor sutil en el fondo */}
      <motion.div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-gradient-to-r from-[#be8f52]/5 via-[#be8f52]/10 to-[#be8f52]/5 rounded-full blur-3xl"
        animate={{ 
          opacity: [0.3, 0.5, 0.3] 
        }}
        transition={{ 
          duration: 12, 
          repeat: Infinity, 
          repeatType: "reverse" 
        }}
      />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <ScrollReveal 
          direction="up" 
          className="max-w-3xl mx-auto text-center mb-12"
          staggerChildren={true}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Nuestro <span className="text-[#be8f52]">Equipo</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Artistas tatuadores con experiencia y pasión por el arte
          </p>
          <div className="h-1 w-20 bg-[#be8f52]/30 mx-auto mt-6"></div>
        </ScrollReveal>
        
        <ScrollReveal direction="up" delay={0.3} className="mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {artists.map((artist, index) => (
              <ScrollReveal 
                key={index} 
                delay={0.1 * index} 
                direction="up"
              >
                <ArtistCard
                  name={artist.name}
                  role={artist.role}
                  image={artist.image}
                  specialty={artist.specialty}
                  instagram={artist.instagram}
                />
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>
        
        <ScrollReveal direction="up" delay={0.5} className="mt-16 text-center">
          <MagneticButton magneticStrength={80} className="inline-block">
            <Link 
              href="/artistas" 
              className="inline-flex items-center px-8 py-3 bg-[#be8f52]/10 hover:bg-[#be8f52]/20 text-[#be8f52] font-medium rounded-lg transition-colors duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">Conoce más sobre nuestro equipo</span>
              <ArrowRight size={18} className="ml-2 transform group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </MagneticButton>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default TeamSection;