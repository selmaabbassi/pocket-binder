import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { seriesSlug: string } }
) {
  const serie = await prisma.series.findUnique({
    where: { slug: params.seriesSlug },
  });

  if (!serie) {
    return NextResponse.json({ error: "Serie not found" }, { status: 404 });
  }

  return NextResponse.json(serie);
}
