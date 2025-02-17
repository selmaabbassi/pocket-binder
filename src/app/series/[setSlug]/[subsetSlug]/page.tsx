import Image from "next/image";
import { Header } from "../../../../../components/Header";

const seriesData: Record<
  string,
  {
    name: string;
    subsets: Record<
      string,
      { name: string; cards: { id: string; name: string; imageUrl: string }[] }
    >;
  }
> = {
  "scarlet-and-violet": {
    name: "Scarlet & Violet",
    subsets: {
      "prismatic-evolutions": {
        name: "Prismatic Evolutions",
        cards: [
          {
            id: "001",
            name: "Exeggcute",
            imageUrl: "/scarlet-and-violet/prismatic-evolutions/svpe001.png",
          },
          {
            id: "002",
            name: "Exeggutor",
            imageUrl: "/scarlet-and-violet/prismatic-evolutions/svpe002.png",
          },
        ],
      },
    },
  },
};

export default function CardsPage({
  params,
}: {
  params: { setSlug: string; subsetSlug: string };
}) {
  const series = seriesData[params.setSlug];
  const subset = series?.subsets[params.subsetSlug];

  if (!series || !subset) return <h1>Subset Not Found</h1>;

  return (
    <div>
      <Header
        title={series.name}
        backUrl={`/series/${params.setSlug}`}
        subtitle={subset.name}
      />

      <div className="grid grid-cols-4 grid-rows-5 gap-4">
        {subset.cards.map((card) => (
          <div key={card.id}>
            <Image
              src={card.imageUrl}
              width={250}
              height={250}
              alt={card.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
