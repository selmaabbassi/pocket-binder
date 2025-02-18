-- CreateTable
CREATE TABLE "Card" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "number" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "collected" BOOLEAN NOT NULL DEFAULT false,
    "subsetSlug" TEXT NOT NULL,
    CONSTRAINT "Card_subsetSlug_fkey" FOREIGN KEY ("subsetSlug") REFERENCES "Subset" ("slug") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Subset" (
    "slug" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "seriesSlug" TEXT NOT NULL,
    CONSTRAINT "Subset_seriesSlug_fkey" FOREIGN KEY ("seriesSlug") REFERENCES "Series" ("slug") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Series" (
    "slug" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);
