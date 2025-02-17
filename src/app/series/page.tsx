import { Header } from "../../../components/Header";
import { SeriesLink } from "../../../components/SeriesLink";

const seriesList = [
  { name: "Scarlet & Violet", slug: "scarlet-and-violet" },
  { name: "Sword & Shield", slug: "sword-and-shield" },
];

export default function SeriesPage() {
  return (
    <>
      <Header title="Pokémon TCG Series" />
      <div className="grid grid-cols-1 grid-rows-5 gap-4">
        {seriesList.map((series) => (
          <div key={series.slug}>
            <SeriesLink title={series.name} href={`/series/${series.slug}`} />
          </div>
        ))}
      </div>
    </>
  );
}
