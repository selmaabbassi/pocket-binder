"use client";

import Image from "next/image";
import { Header } from "../../../../../components/Header";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card } from "@prisma/client";

export default function CardsPage() {
  const { setSlug, subsetSlug } = useParams();
  const [cards, setCards] = useState<Card[]>([]);
  const [series, setSeries] = useState("");
  const [subset, setSubset] = useState("");

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

    async function getCards() {
      if (!setSlug || !subsetSlug) return;

      try {
        const res = await fetch(`/api/series/${setSlug}/${subsetSlug}/cards`);
        if (!res.ok) throw new Error("Failed to fetch cards");

        const data = await res.json();
        setCards(data.cards);
        setSeriesName(data.seriesName); // Assuming API returns the series name
        setSubsetName(data.subsetName); // Assuming API returns the subset name
      } catch (error) {
        console.error(error);
      }
    }

    getCards();
  }, [setSlug, subsetSlug]);

  const toggleCollected = (id: string) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, collected: !card.collected } : card
      )
    );
  };

  if (!series || !subset) return <h1>Subset Not Found</h1>;

  return (
    <div>
      <Header
        title={series.name}
        backUrl={`/series/${params.setSlug}`}
        subtitle={subset.name}
      />

      <div className="flex justify-center items-center min-h-screen">
        <div className="grid grid-cols-4 grid-rows-5 gap-4">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`card w-96 shadow-xl transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl ${
                card.collected
                  ? "bg-green-200 border border-green-500"
                  : "bg-base-100"
              }`}
            >
              <figure className="px-10 pt-10">
                <Image
                  src={card.imageUrl}
                  width={250}
                  height={250}
                  alt={card.name}
                />
              </figure>
              <div className="card-body text-center">
                <h2>
                  <b>#{card.id}</b> {card.name}
                </h2>
                <div className="card-actions justify-end">
                  <button
                    className={`btn ${
                      card.collected ? "btn-error" : "btn-success"
                    }`}
                    onClick={() => toggleCollected(card.id)}
                  >
                    <span className="material-symbols-outlined">
                      {card.collected ? "close" : "check"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
