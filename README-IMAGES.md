# Instrucciones para imágenes

Para que la sección de "Reserva tu cita" funcione correctamente, es necesario añadir las siguientes imágenes:

## Artistas

Crear la carpeta `/public/images/artists/` si no existe y añadir:

- `/public/images/artists/gamboa.jpg` (o renombrar el existente `gamboa.webp` a `.jpg`)
- `/public/images/artists/edward.jpg`
- `/public/images/artists/airon.jpg`
- `/public/images/artists/guzman.jpg`

Estas imágenes deben ser cuadradas, idealmente de 300x300 píxeles, con los rostros de los artistas.

## Testimonios

Crear la carpeta `/public/images/testimonials/` y añadir:

- `/public/images/testimonials/client1.jpg`
- `/public/images/testimonials/client2.jpg`
- `/public/images/testimonials/client3.jpg`

Estas imágenes deben ser cuadradas, idealmente de 200x200 píxeles, con rostros de clientes.

## Alternativa temporal

Si no dispones de estas imágenes inmediatamente, puedes modificar temporalmente el componente `BookingSection` para que funcione sin ellas:

1. Sustituir las imágenes de los artistas por avatares genéricos o iniciales.
2. Sustituir las imágenes de testimonios por avatares genéricos o iniciales.

Por ejemplo, puedes modificar las respectivas secciones para usar un componente de avatar simple en lugar de la etiqueta `Image`. 