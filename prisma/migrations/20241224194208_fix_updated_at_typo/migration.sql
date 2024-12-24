/*
  Warnings:

  - You are about to drop the column `updateAt` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `NoteImage` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `UserImage` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Note` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `NoteImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `UserImage` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Note" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ownerId" TEXT NOT NULL,
    CONSTRAINT "Note_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Note" ("content", "createdAt", "id", "ownerId", "title") SELECT "content", "createdAt", "id", "ownerId", "title" FROM "Note";
DROP TABLE "Note";
ALTER TABLE "new_Note" RENAME TO "Note";
CREATE TABLE "new_NoteImage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "altText" TEXT NOT NULL,
    "contentType" TEXT NOT NULL,
    "blob" BLOB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "noteId" TEXT NOT NULL,
    CONSTRAINT "NoteImage_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_NoteImage" ("altText", "blob", "contentType", "createdAt", "id", "noteId") SELECT "altText", "blob", "contentType", "createdAt", "id", "noteId" FROM "NoteImage";
DROP TABLE "NoteImage";
ALTER TABLE "new_NoteImage" RENAME TO "NoteImage";
CREATE TABLE "new_UserImage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "altText" TEXT NOT NULL,
    "contentType" TEXT NOT NULL,
    "blob" BLOB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    CONSTRAINT "UserImage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_UserImage" ("altText", "blob", "contentType", "createdAt", "id", "userId") SELECT "altText", "blob", "contentType", "createdAt", "id", "userId" FROM "UserImage";
DROP TABLE "UserImage";
ALTER TABLE "new_UserImage" RENAME TO "UserImage";
CREATE UNIQUE INDEX "UserImage_userId_key" ON "UserImage"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
