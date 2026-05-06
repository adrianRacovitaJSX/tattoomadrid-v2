type Props = {
  id?: string;
  data: Record<string, unknown> | Record<string, unknown>[];
};

export default function JsonLd({ id, data }: Props) {
  return (
    <script
      type="application/ld+json"
      id={id}
      // El JSON-LD se serializa en el HTML estático (SSR) para que Googlebot lo lea sin JS.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
