import { client } from './client';

type FetchParams = Record<string, unknown>;

type FetchOptions = {
  params?: FetchParams;
  /** Tags para revalidación on-demand (revalidateTag). */
  tags?: string[];
  /** Segundos. Por defecto 60 — n8n publica y se ve en máx. 60 s. */
  revalidate?: number;
};

export async function sanityFetch<T = unknown>(
  query: string,
  { params = {}, tags = ['sanity'], revalidate = 60 }: FetchOptions = {}
): Promise<T> {
  return client.fetch<T>(query, params, {
    next: {
      revalidate,
      tags,
    },
  });
}
