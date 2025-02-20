import { Header } from "../../../components/Header";
import { SeriesLink } from "../../../components/SeriesLink";
import { Series } from "@prisma/client";

async function getSeries() {
  const res = await fetch(`${process.env.BASE_URL}/api/series`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function SeriesPage() {
  const series: Series[] = await getSeries();

  return (
    <>
      <Header title="Pokémon TCG Series" />
      <div className="grid grid-cols-1 grid-rows-5 gap-4">
        {series.map((series) => (
          <div key={series.slug}>
            <SeriesLink title={series.name} href={`/series/${series.slug}`} />
          </div>
        ))}
      </div>
    </>
  );
}
