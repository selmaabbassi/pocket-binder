"use client";

import Image from "next/image";
import { Header } from "../../../../../components/Header";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, Series, Subset } from "@prisma/client";

export default function CardsPage() {
  const { seriesSlug, subsetSlug } = useParams();
  const [selectedSeries, setSelectedSeries] = useState<Series | null>(null);
  const [selectedSubset, setSelectedSubset] = useState<Subset | null>(null);
  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [seriesRes, subsetRes, cardsRes] = await Promise.all([
          fetch(`/api/series/${seriesSlug}`).then((res) => res.json()),
          fetch(`/api/subset/${subsetSlug}`).then((res) => res.json()),
          fetch(`/api/cards/${subsetSlug}`).then((res) => res.json()),
        ]);

        setSelectedSeries(seriesRes);
        setSelectedSubset(subsetRes);
        setCards(cardsRes);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [seriesSlug, subsetSlug]);

  const toggleCollected = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/card/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collected: !currentStatus }),
      });

      if (!res.ok) throw new Error("Failed to update card");

      const updatedCard = await res.json();

      setCards((prevCards) =>
        prevCards.map((card) =>
          card.id === updatedCard.id ? updatedCard : card
        )
      );
    } catch (error) {
      console.error("Error updating card:", error);
    }
  };

  if (!selectedSubset) return <h1>Cards Not Found</h1>;

  return (
    <div>
      <Header
        title={selectedSeries?.name || "Loading..."}
        backUrl={`/series/${seriesSlug}`}
        subtitle={selectedSubset?.name || ""}
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
                    onClick={() => toggleCollected(card.id, card.collected)}
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
