/*
  Warnings:

  - You are about to drop the column `number` on the `Card` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Card" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "collected" BOOLEAN NOT NULL DEFAULT false,
    "subsetSlug" TEXT NOT NULL
);
INSERT INTO "new_Card" ("collected", "id", "imageUrl", "name", "subsetSlug") SELECT "collected", "id", "imageUrl", "name", "subsetSlug" FROM "Card";
DROP TABLE "Card";
ALTER TABLE "new_Card" RENAME TO "Card";
CREATE TABLE "new_Subset" (
    "slug" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "seriesSlug" TEXT NOT NULL
);
INSERT INTO "new_Subset" ("name", "seriesSlug", "slug") SELECT "name", "seriesSlug", "slug" FROM "Subset";
DROP TABLE "Subset";
ALTER TABLE "new_Subset" RENAME TO "Subset";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
