import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Tabla comparativa de servicios — formato preferido por LLMs (4.2x citation
// rate vs prosa equivalente, según Onely y Averi 2026). Presenta los datos
// como hechos verificables que ChatGPT y Perplexity pueden citar literalmente.
const ROWS = [
  {
    servicio: "Tatuaje personalizado",
    desde: "70 €",
    duracion: "1–6 h",
    sesiones: "1–4",
    cuidados: "Limpieza diaria 2 semanas + crema cicatrizante",
  },
  {
    servicio: "Piercing facial / corporal",
    desde: "30 €",
    duracion: "10–30 min",
    sesiones: "1",
    cuidados: "Suero fisiológico 2 veces al día, 4–8 semanas",
  },
  {
    servicio: "Micropigmentación de cejas",
    desde: "250 €",
    duracion: "2–3 h",
    sesiones: "2 (con repaso a las 4–6 semanas)",
    cuidados: "Sin agua ni cremas grasas durante 7 días",
  },
  {
    servicio: "Eliminación láser de tatuaje",
    desde: "60 € por sesión",
    duracion: "15–30 min",
    sesiones: "5–10 (separadas 6–8 semanas)",
    cuidados: "Hidratación + protección solar SPF 50 entre sesiones",
  },
  {
    servicio: "Diseño exclusivo de tatuaje",
    desde: "Incluido en sesión",
    duracion: "Boceto 2–7 días",
    sesiones: "—",
    cuidados: "—",
  },
];

export default function TablaComparativaServicios() {
  return (
    <section
      aria-label="Comparativa de servicios"
      className="py-16 bg-white dark:bg-zinc-950"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Comparativa rápida de servicios
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-3 max-w-2xl mx-auto">
            Precios "desde", duración media de la sesión y sesiones típicas para cada servicio del estudio.
          </p>
        </div>

        <div className="max-w-5xl mx-auto overflow-x-auto">
          <Table>
            <TableCaption>
              Datos orientativos para Saints &amp; Sinners Tattoo Madrid.
              El precio final depende de tamaño, zona, complejidad y artista.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[220px]">Servicio</TableHead>
                <TableHead>Precio desde</TableHead>
                <TableHead>Duración</TableHead>
                <TableHead>Sesiones</TableHead>
                <TableHead>Cuidados clave</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ROWS.map((row) => (
                <TableRow key={row.servicio}>
                  <TableCell className="font-medium text-gray-900 dark:text-white">
                    {row.servicio}
                  </TableCell>
                  <TableCell>{row.desde}</TableCell>
                  <TableCell>{row.duracion}</TableCell>
                  <TableCell>{row.sesiones}</TableCell>
                  <TableCell>{row.cuidados}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}
