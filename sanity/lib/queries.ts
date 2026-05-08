import { groq } from 'next-sanity';

export const postsListQuery = groq`
  *[_type == "post" && defined(slug.current)]
    | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      keywords,
      coverImage {
        ...,
        "alt": coalesce(alt, "")
      }
    }
`;

export const postSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)][].slug.current
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    _updatedAt,
    keywords,
    body,
    aiGenerated,
    coverImage {
      ...,
      "alt": coalesce(alt, "")
    }
  }
`;

export const relatedPostsQuery = groq`
  *[_type == "post" && slug.current != $slug && defined(slug.current)]
    | order(publishedAt desc)[0...2] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      publishedAt
    }
`;

export const sitemapPostsQuery = groq`
  *[_type == "post" && defined(slug.current)] {
    "slug": slug.current,
    publishedAt,
    _updatedAt
  }
`;
