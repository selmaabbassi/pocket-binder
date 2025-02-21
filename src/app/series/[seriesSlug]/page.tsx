import { SeriesLink } from "../../components/SeriesLink";
import { Header } from "../../components/Header";
import { Series, Subset } from "@prisma/client";

async function getSeries(seriesSlug: string) {
  const res = await fetch(`${process.env.BASE_URL}/api/series/${seriesSlug}`, {
    cache: "no-store",
  });
  return res.json();
}

async function getSubsets(seriesSlug: string) {
  const res = await fetch(`${process.env.BASE_URL}/api/subsets/${seriesSlug}`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function SubSetPage({
  params,
}: {
  params: { seriesSlug: string };
}) {
  const { seriesSlug } = params;
  const selectedSeries: Series = await getSeries(seriesSlug);
  const subsets: Subset[] = await getSubsets(seriesSlug);

  if (!selectedSeries) return <>Subset not found</>;

  return (
    <div>
      <Header title={selectedSeries.name} backUrl="/series" />
      <div className="grid grid-cols-1 grid-rows-5 gap-4">
        {subsets.map((subset) => (
          <div key={subset.slug}>
            <SeriesLink
              title={subset.name}
              href={`/series/${seriesSlug}/${subset.slug}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
