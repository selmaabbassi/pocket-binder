import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const series = await prisma.series.findMany();
  return NextResponse.json(series);
}
