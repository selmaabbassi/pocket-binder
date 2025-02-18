"use client";

import { useEffect, useState } from "react";
import { Header } from "../../../components/Header";
import { SeriesLink } from "../../../components/SeriesLink";
import { Series } from "@prisma/client";

export default function SeriesPage() {
  const [series, setSeries] = useState<Series[]>([]);

  useEffect(() => {
    async function getSeries() {
      const res = await fetch("/api/series");
      const data = await res.json();
      setSeries(data);
    }
    getSeries();
  }, []);

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
