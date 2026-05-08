import { defineField, defineType } from 'sanity';

export const post = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required().min(10).max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Resumen / TL;DR',
      type: 'text',
      rows: 3,
      description: 'Aparece en la lista del blog y en los meta tags.',
      validation: (Rule) => Rule.required().min(50).max(300),
    }),
    defineField({
      name: 'coverImage',
      title: 'Imagen de portada',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texto alternativo',
        },
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha de publicación',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords (SEO)',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'body',
      title: 'Contenido',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'aiGenerated',
      title: 'Generado por IA',
      type: 'boolean',
      description: 'Marcado automáticamente cuando el post entra vía n8n.',
      initialValue: false,
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
      date: 'publishedAt',
      ai: 'aiGenerated',
    },
    prepare({ title, media, date, ai }) {
      const subtitle = [
        date ? new Date(date).toLocaleDateString('es-ES') : null,
        ai ? '🤖 IA' : null,
      ]
        .filter(Boolean)
        .join(' · ');
      return { title, media, subtitle };
    },
  },
  orderings: [
    {
      title: 'Más recientes primero',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
});
