import Link from "next/link";
import { SeriesLink } from "../../../../components/SeriesLink";
import { Header } from "../../../../components/Header";

const seriesData: Record<
  string,
  { name: string; subsets: { name: string; slug: string }[] }
> = {
  "scarlet-and-violet": {
    name: "Scarlet & Violet",
    subsets: [
      { name: "Prismatic Evolutions", slug: "prismatic-evolutions" },
      { name: "Surging Sparks", slug: "surging-sparks" },
    ],
  },
};

export default function SubSetPage({
  params,
}: {
  params: { setSlug: string };
}) {
  const series = seriesData[params.setSlug];

  if (!series) return <h1>Series Not Found</h1>;

  return (
    <div>
      <Header title={series.name} backUrl="/series" />
      <div className="grid grid-cols-1 grid-rows-5 gap-4">
        {series.subsets.map((subset) => (
          <div key={subset.slug}>
            <SeriesLink
              title={subset.name}
              href={`/series/${params.setSlug}/${subset.slug}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
