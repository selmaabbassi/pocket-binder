"use client";

import Image from "next/image";
import { Header } from "../../../components/Header";
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

      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-4 sm:px-6 md:px-8 lg:px-12">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`relative w-full max-w-[300px] mx-auto aspect-[733/1024] overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105 ${
              card.collected ? "bg-green-600" : "shadow-lg"
            }`}
          >
            <Image
              src={card.imageUrl}
              layout="fill"
              objectFit="contain"
              alt={card.name}
              className="absolute inset-0 w-full h-full"
            />

            {card.collected && (
              <div className="absolute inset-0 bg-green-500 opacity-30"></div>
            )}

            {/* Floating Button (Responsive Positioning) */}
            <button
              className={`absolute bottom-2 right-2 sm:bottom-4 sm:right-4 px-3 py-2 text-white rounded-full transition-all duration-300 ${
                card.collected
                  ? "bg-red-500 hover:bg-red-700"
                  : "bg-green-500 hover:bg-green-700"
              }`}
              onClick={() => toggleCollected(card.id, card.collected)}
            >
              <span className="material-symbols-outlined text-lg sm:text-xl">
                {card.collected ? "close" : "check"}
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
