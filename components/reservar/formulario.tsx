"use client";

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Mail, Phone, Calendar, MapPin, 
  Image as ImageIcon, Send, CheckCircle, AlertCircle,
  Clock, Info
} from 'lucide-react';
import Link from 'next/link';

const artistas = [
  { id: 'gamboa', nombre: 'Gamboa The Goat', especialidad: 'Realismo & Chicano' },
  { id: 'edward', nombre: 'Edward Ortiz', especialidad: 'Neotradicional' },
  { id: 'airon', nombre: 'Airon Broncano', especialidad: 'Realismo' },
  { id: 'yury', nombre: 'Yury Marino', especialidad: 'Realismo Fine Line & Lettering' }
];

const horarios = [
  'Mañana (11:00 - 14:00)',
  'Tarde (15:00 - 20:00)',
  'Indiferente'
];

const ReservaForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    artista: '',
    zonaTatuaje: '',
    dimensiones: '',
    horario: '',
    mensaje: '',
    aceptaPrivacidad: false,
    aceptaMarketing: false
  });

  const [imagenes, setImagenes] = useState<File[]>([]);
  const [imagenesPreview, setImagenesPreview] = useState<string[]>([]);
  const [enviando, setEnviando] = useState(false);
  const [estadoForm, setEstadoForm] = useState<null | 'success' | 'error'>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Manejar cambios en los campos del formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };

  // Manejar la selección de imágenes
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      
      // Limitar a 4 imágenes como máximo
      const selectedFiles = filesArray.slice(0, 4);
      
      // Actualizar el estado de las imágenes
      setImagenes(prevImages => {
        const newImages = [...prevImages, ...selectedFiles];
        return newImages.slice(0, 4); // Mantener máximo 4 imágenes
      });
      
      // Crear URLs para las previsualizaciones
      const imageURLs = selectedFiles.map(file => URL.createObjectURL(file));
      
      setImagenesPreview(prevPreviews => {
        const newPreviews = [...prevPreviews, ...imageURLs];
        return newPreviews.slice(0, 4); // Mantener máximo 4 previsualizaciones
      });
    }
  };

  // Eliminar una imagen
  const removeImage = (index: number) => {
    setImagenes(prevImages => prevImages.filter((_, i) => i !== index));
    
    // Revocar la URL para liberar memoria
    URL.revokeObjectURL(imagenesPreview[index]);
    setImagenesPreview(prevPreviews => prevPreviews.filter((_, i) => i !== index));
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    
    try {
      // Aquí iría la lógica para enviar el formulario al backend
      // Por ejemplo, creando un FormData con todos los campos e imágenes
      const formDataToSend = new FormData();
      
      // Añadir campos de texto
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value.toString());
      });
      
      // Añadir imágenes
      imagenes.forEach((image, index) => {
        formDataToSend.append(`imagen${index + 1}`, image);
      });
      
      // Simulando una petición de envío que tarda 2 segundos
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simular una respuesta exitosa
      setEstadoForm('success');
      
      // Reiniciar el formulario después de un envío exitoso
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        artista: '',
        zonaTatuaje: '',
        dimensiones: '',
        horario: '',
        mensaje: '',
        aceptaPrivacidad: false,
        aceptaMarketing: false
      });
      
      // Limpiar imágenes
      imagenesPreview.forEach(url => URL.revokeObjectURL(url));
      setImagenes([]);
      setImagenesPreview([]);
      
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      setEstadoForm('error');
    } finally {
      setEnviando(false);
      
      // Resetear el estado del formulario después de 5 segundos
      setTimeout(() => {
        setEstadoForm(null);
      }, 5000);
    }
  };

  // Variantes para animaciones
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <motion.div 
      className="bg-white dark:bg-zinc-800 rounded-2xl shadow-xl overflow-hidden border border-zinc-200 dark:border-zinc-700"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Estado del formulario (éxito/error) */}
      {estadoForm && (
        <div className={`p-5 ${
          estadoForm === 'success' 
            ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-400 border-b border-green-200 dark:border-green-800/30' 
            : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-400 border-b border-red-200 dark:border-red-800/30'
        }`}>
          <div className="flex items-start">
            {estadoForm === 'success' ? (
              <CheckCircle className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
            ) : (
              <AlertCircle className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
            )}
            <div>
              <h3 className="font-semibold">
                {estadoForm === 'success' ? '¡Solicitud enviada!' : 'Error al enviar'}
              </h3>
              <p className="text-sm mt-1">
                {estadoForm === 'success' 
                  ? 'Hemos recibido tu solicitud de cita. Te contactaremos lo antes posible para confirmar los detalles.' 
                  : 'Ha ocurrido un error al enviar tu solicitud. Por favor, inténtalo de nuevo o contáctanos directamente por teléfono.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Columna izquierda */}
          <div className="space-y-5">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white flex items-center">
              <User size={18} className="mr-2 text-[#be8f52]" /> 
              Datos personales
            </h3>
            
            {/* Nombre */}
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Nombre completo
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required
                  className="block w-full px-4 py-3 border border-zinc-300 dark:border-zinc-600 rounded-lg shadow-sm focus:ring-2 focus:ring-[#be8f52]/50 focus:border-[#be8f52] dark:bg-zinc-700 dark:text-white text-sm"
                  placeholder="Tu nombre"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="block w-full px-4 py-3 border border-zinc-300 dark:border-zinc-600 rounded-lg shadow-sm focus:ring-2 focus:ring-[#be8f52]/50 focus:border-[#be8f52] dark:bg-zinc-700 dark:text-white text-sm"
                  placeholder="Tu email"
                />
              </div>
            </div>

            {/* Teléfono */}
            <div>
              <label htmlFor="telefono" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Teléfono
              </label>
              <div className="relative">
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  required
                  className="block w-full px-4 py-3 border border-zinc-300 dark:border-zinc-600 rounded-lg shadow-sm focus:ring-2 focus:ring-[#be8f52]/50 focus:border-[#be8f52] dark:bg-zinc-700 dark:text-white text-sm"
                  placeholder="Tu número de teléfono"
                />
              </div>
            </div>

            {/* Artista */}
            <div>
              <label htmlFor="artista" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Artista
              </label>
              <div className="relative">
                <select
                  id="artista"
                  name="artista"
                  value={formData.artista}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-3 border border-zinc-300 dark:border-zinc-600 rounded-lg shadow-sm focus:ring-2 focus:ring-[#be8f52]/50 focus:border-[#be8f52] dark:bg-zinc-700 dark:text-white text-sm appearance-none"
                >
                  <option value="">Selecciona un artista</option>
                  <option value="sin_preferencia">Sin preferencia</option>
                  {artistas.map((artista) => (
                    <option key={artista.id} value={artista.id}>
                      {artista.nombre} - {artista.especialidad}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="h-5 w-5 text-zinc-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Horario */}
            <div>
              <label htmlFor="horario" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Horario preferido
              </label>
              <div className="relative">
                <select
                  id="horario"
                  name="horario"
                  value={formData.horario}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-3 border border-zinc-300 dark:border-zinc-600 rounded-lg shadow-sm focus:ring-2 focus:ring-[#be8f52]/50 focus:border-[#be8f52] dark:bg-zinc-700 dark:text-white text-sm appearance-none"
                >
                  <option value="">Selecciona un horario</option>
                  {horarios.map((horario) => (
                    <option key={horario} value={horario}>
                      {horario}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="h-5 w-5 text-zinc-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Columna derecha */}
          <div className="space-y-5">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white flex items-center">
              <MapPin size={18} className="mr-2 text-[#be8f52]" /> 
              Detalles del tatuaje
            </h3>

            {/* Zona del tatuaje */}
            <div>
              <label htmlFor="zonaTatuaje" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Zona del tatuaje
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="zonaTatuaje"
                  name="zonaTatuaje"
                  value={formData.zonaTatuaje}
                  onChange={handleInputChange}
                  required
                  className="block w-full px-4 py-3 border border-zinc-300 dark:border-zinc-600 rounded-lg shadow-sm focus:ring-2 focus:ring-[#be8f52]/50 focus:border-[#be8f52] dark:bg-zinc-700 dark:text-white text-sm"
                  placeholder="Ej: Brazo, pierna, espalda..."
                />
              </div>
            </div>

            {/* Dimensiones */}
            <div>
              <label htmlFor="dimensiones" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Dimensiones aproximadas
              </label>
              <input
                type="text"
                id="dimensiones"
                name="dimensiones"
                value={formData.dimensiones}
                onChange={handleInputChange}
                required
                className="block w-full px-4 py-3 border border-zinc-300 dark:border-zinc-600 rounded-lg shadow-sm focus:ring-2 focus:ring-[#be8f52]/50 focus:border-[#be8f52] dark:bg-zinc-700 dark:text-white text-sm"
                placeholder="Ej: 10x15cm, tamaño antebrazo..."
              />
            </div>

            {/* Descripción */}
            <div>
              <label htmlFor="mensaje" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Describe tu idea
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows={3}
                value={formData.mensaje}
                onChange={handleInputChange}
                required
                className="block w-full px-4 py-3 border border-zinc-300 dark:border-zinc-600 rounded-lg shadow-sm focus:ring-2 focus:ring-[#be8f52]/50 focus:border-[#be8f52] dark:bg-zinc-700 dark:text-white text-sm resize-none"
                placeholder="Describe tu idea para el tatuaje, estilo, colores, etc."
              ></textarea>
            </div>

            {/* Subida de imágenes */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Referencias visuales
              </label>
              <div className="mt-1 p-3 border-2 border-zinc-300 dark:border-zinc-600 border-dashed rounded-lg bg-zinc-50 dark:bg-zinc-700/50">
                <div className="flex flex-col items-center justify-center">
                  <ImageIcon className="h-7 w-7 text-zinc-400 dark:text-zinc-500 mb-2" />
                  <div className="text-sm text-center">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer text-[#be8f52] hover:text-[#be8f52]/80 font-medium"
                    >
                      <span>Arrastra o selecciona imágenes</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        ref={fileInputRef}
                        className="sr-only"
                      />
                    </label>
                    <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                      PNG, JPG, GIF (max. 4MB)
                    </p>
                  </div>
                </div>

                {/* Previsualización de imágenes */}
                {imagenesPreview.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {imagenesPreview.map((url, index) => (
                      <div key={index} className="relative group">
                        <img 
                          src={url} 
                          alt={`Vista previa ${index + 1}`} 
                          className="h-20 w-full object-cover rounded-md border border-zinc-300 dark:border-zinc-600" 
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 text-white opacity-80 hover:opacity-100 shadow-sm"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Términos y botones - ocupan todo el ancho */}
        <div className="mt-8 space-y-5">
          <div className="space-y-3 border-t border-zinc-200 dark:border-zinc-700 pt-5">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="aceptaPrivacidad"
                  name="aceptaPrivacidad"
                  type="checkbox"
                  checked={formData.aceptaPrivacidad}
                  onChange={handleInputChange}
                  required
                  className="h-4 w-4 text-[#be8f52] border-zinc-300 dark:border-zinc-600 rounded focus:ring-[#be8f52] dark:bg-zinc-700"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="aceptaPrivacidad" className="font-medium text-zinc-700 dark:text-zinc-300">
                  Acepto la política de privacidad *
                </label>
                <p className="text-zinc-500 dark:text-zinc-400">
                  He leído y acepto la <Link href="/privacidad" className="text-[#be8f52] hover:underline">política de privacidad</Link> de Saints & Sinners by Gamboa.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="aceptaMarketing"
                  name="aceptaMarketing"
                  type="checkbox"
                  checked={formData.aceptaMarketing}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-[#be8f52] border-zinc-300 dark:border-zinc-600 rounded focus:ring-[#be8f52] dark:bg-zinc-700"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="aceptaMarketing" className="font-medium text-zinc-700 dark:text-zinc-300">
                  Acepto recibir comunicaciones comerciales
                </label>
                <p className="text-zinc-500 dark:text-zinc-400">
                  Deseo recibir información sobre promociones, eventos y novedades de Saints & Sinners by Gamboa.
                </p>
              </div>
            </div>
          </div>
          
          {/* Botón de envío */}
          <div className="text-right">
            <motion.button
              type="submit"
              disabled={enviando}
              className={`inline-flex justify-center items-center px-6 py-3 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-gradient-to-r from-[#be8f52] to-amber-500 hover:from-[#be8f52]/90 hover:to-amber-500/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#be8f52] transition-all duration-200 ${
                enviando ? 'opacity-70 cursor-not-allowed' : ''
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {enviando ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Solicitar Cita
                </>
              )}
            </motion.button>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default ReservaForm; 