"use client";

import Image from "next/image";
import { Header } from "../../../../../components/Header";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { usePocketBinderContext } from "@/app/context/PocketBinderContext";
import { Card } from "@prisma/client";

export default function CardsPage() {
  const { seriesSlug, subsetSlug } = useParams();
  const [cards, setCards] = useState<Card[]>([]);
  const { selectedSeries, selectedSubset, setSelectedSubset } =
    usePocketBinderContext();

  useEffect(() => {
    async function getSubset() {
      try {
        const res = await fetch(`/api/subset/${subsetSlug}`);
        const data = await res.json();
        setSelectedSubset(data);
      } catch (error) {
        console.error(error);
      }
    }

    async function getCards() {
      try {
        const res = await fetch(`/api/cards/${subsetSlug}`);
        const data = await res.json();
        setCards(data);
      } catch (error) {
        console.error(error);
      }
    }

    getSubset();
    getCards();
  }, [seriesSlug, subsetSlug, setSelectedSubset]);

  const toggleCollected = (id: string) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, collected: !card.collected } : card
      )
    );
  };

  if (!seriesSlug || !subsetSlug || !selectedSeries || !selectedSubset)
    return <h1>Cards Not Found</h1>;

  return (
    <div>
      <Header
        title={selectedSeries.name}
        backUrl={`/series/${seriesSlug}`}
        subtitle={selectedSubset.name}
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
                  <b>#{card.number}</b> {card.name}
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
