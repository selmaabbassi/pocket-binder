import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(
  req: NextRequest,
  { params }: { params: { cardId: string } }
) {
  try {
    const { collected } = await req.json();

    const updatedCard = await prisma.card.update({
      where: { id: params.cardId },
      data: { collected },
    });

    return NextResponse.json(updatedCard);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update card" },
      { status: 500 }
    );
  }
}
