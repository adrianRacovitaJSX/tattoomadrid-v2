import Image from 'next/image';
import Link from 'next/link';
import { PortableText, type PortableTextComponents } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/react';
import { urlForImage } from '@/sanity/lib/image';

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mt-10 mb-4 scroll-mt-24">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-3 scroll-mt-24">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-2">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#be8f52] pl-4 italic text-gray-700 dark:text-gray-300 my-6">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-6">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-6">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-[#be8f52]">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-zinc-800 text-sm font-mono text-[#be8f52]">
        {children}
      </code>
    ),
    link: ({ value, children }) => {
      const href = value?.href ?? '#';
      const isExternal = /^https?:\/\//.test(href);
      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#be8f52] underline underline-offset-4 hover:opacity-80"
          >
            {children}
          </a>
        );
      }
      return (
        <Link
          href={href}
          className="text-[#be8f52] underline underline-offset-4 hover:opacity-80"
        >
          {children}
        </Link>
      );
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const url = urlForImage(value).width(1200).fit('max').url();
      return (
        <figure className="my-8">
          <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-zinc-900">
            <Image
              src={url}
              alt={value.alt ?? ''}
              fill
              sizes="(min-width: 768px) 768px, 100vw"
              className="object-cover"
            />
          </div>
          {value.caption && (
            <figcaption className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    codeBlock: ({ value }) => (
      <pre className="my-6 p-4 rounded-lg bg-zinc-900 text-gray-100 overflow-x-auto text-sm">
        <code>{value?.code ?? ''}</code>
      </pre>
    ),
  },
};

export function BlogPortableText({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />;
}
