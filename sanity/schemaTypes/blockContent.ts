import { defineArrayMember, defineType } from 'sanity';

export const blockContent = defineType({
  title: 'Contenido',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Cita', value: 'blockquote' },
      ],
      lists: [
        { title: 'Lista', value: 'bullet' },
        { title: 'Numerada', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Negrita', value: 'strong' },
          { title: 'Cursiva', value: 'em' },
          { title: 'Código', value: 'code' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Enlace',
            fields: [
              {
                name: 'href',
                type: 'url',
                title: 'URL',
                validation: (Rule) =>
                  Rule.uri({
                    scheme: ['http', 'https', 'mailto', 'tel'],
                  }),
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texto alternativo',
          description: 'Importante para SEO y accesibilidad.',
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Pie de imagen',
        },
      ],
    }),
    defineArrayMember({
      type: 'object',
      name: 'codeBlock',
      title: 'Código',
      fields: [
        { name: 'code', type: 'text', title: 'Código' },
        { name: 'language', type: 'string', title: 'Lenguaje' },
      ],
      preview: {
        select: { code: 'code', language: 'language' },
        prepare({ code, language }) {
          return {
            title: language || 'Código',
            subtitle: typeof code === 'string' ? code.slice(0, 60) : '',
          };
        },
      },
    }),
  ],
});
