import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { seriesSlug: string } }
) {
  const subsets = await prisma.subset.findMany({
    where: { seriesSlug: params.seriesSlug },
  });

  if (!subsets.length) {
    return NextResponse.json(
      { error: "No subsets found for this series" },
      { status: 404 }
    );
  }

  return NextResponse.json(subsets);
}
