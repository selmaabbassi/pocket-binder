import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { subsetSlug: string } }
) {
  const cards = await prisma.card.findMany({
    where: { subsetSlug: params.subsetSlug },
  });

  if (cards.length === 0) {
    return NextResponse.json({ error: "Cards not found" }, { status: 404 });
  }

  return NextResponse.json(cards);
}
