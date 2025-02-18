"use client";

import { SeriesLink } from "../../../../components/SeriesLink";
import { Header } from "../../../../components/Header";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Series, Subset } from "@prisma/client";

export default function SubSetPage() {
  const { setSlug: seriesSlug } = useParams();
  const [subsets, setSubsets] = useState<Subset[]>([]);
  const [series, setSeries] = useState<Series>();

  useEffect(() => {
    async function getSeries() {
      if (!seriesSlug) return;

      try {
        const res = await fetch(`/api/series/${seriesSlug}`);
        if (!res.ok) throw new Error("Failed to fetch series");

        const data = await res.json();
        setSeries(data);
      } catch (error) {
        console.error(error);
      }
    }

    async function getSubsets() {
      if (!seriesSlug) return;

      try {
        const res = await fetch(`/api/subsets/${seriesSlug}`);
        if (!res.ok) throw new Error("Failed to fetch subsets");

        const data = await res.json();
        setSubsets(data);
      } catch (error) {
        console.error(error);
      }
    }

    getSeries();
    getSubsets();
  }, [seriesSlug]);

  if (!series) return <h1>Series Not Found</h1>;

  return (
    <div>
      <Header title={series.name} backUrl="/series" />
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
