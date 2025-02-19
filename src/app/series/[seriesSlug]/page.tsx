"use client";

import { SeriesLink } from "../../../../components/SeriesLink";
import { Header } from "../../../../components/Header";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { usePocketBinderContext } from "@/app/context/PocketBinderContext";
import { Subset } from "@prisma/client";

export default function SubSetPage() {
  const { seriesSlug } = useParams();
  const [subsets, setSubsets] = useState<Subset[]>([]);
  const { selectedSeries, setSelectedSeries } = usePocketBinderContext();

  useEffect(() => {
    async function getSeries() {
      try {
        const res = await fetch(`/api/series/${seriesSlug}`);
        const data = await res.json();
        setSelectedSeries(data);
      } catch (error) {
        console.error(error);
      }
    }

    async function getSubsets() {
      try {
        const res = await fetch(`/api/subsets/${seriesSlug}`);
        const data = await res.json();
        setSubsets(data);
      } catch (error) {
        console.error(error);
      }
    }
    if (!selectedSeries || selectedSeries.slug !== seriesSlug) {
      getSeries();
      getSubsets();
    }
  }, [seriesSlug, selectedSeries, setSelectedSeries]);

  if (!selectedSeries || selectedSeries.slug !== seriesSlug)
    return <>Subset not found</>;

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
