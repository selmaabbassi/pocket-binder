import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { subsetSlug: string } }
) {
  const subset = await prisma.subset.findUnique({
    where: { slug: params.subsetSlug },
  });

  if (!subset) {
    return NextResponse.json({ error: "Subset not found" }, { status: 404 });
  }

  return NextResponse.json(subset);
}
