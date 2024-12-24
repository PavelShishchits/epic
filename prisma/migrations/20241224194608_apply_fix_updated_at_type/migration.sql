-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Note" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "ownerId" TEXT NOT NULL,
    CONSTRAINT "Note_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Note" ("content", "createdAt", "id", "ownerId", "title", "updatedAt") SELECT "content", "createdAt", "id", "ownerId", "title", "updatedAt" FROM "Note";
DROP TABLE "Note";
ALTER TABLE "new_Note" RENAME TO "Note";
CREATE TABLE "new_NoteImage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "altText" TEXT NOT NULL,
    "contentType" TEXT NOT NULL,
    "blob" BLOB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "noteId" TEXT NOT NULL,
    CONSTRAINT "NoteImage_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_NoteImage" ("altText", "blob", "contentType", "createdAt", "id", "noteId", "updatedAt") SELECT "altText", "blob", "contentType", "createdAt", "id", "noteId", "updatedAt" FROM "NoteImage";
DROP TABLE "NoteImage";
ALTER TABLE "new_NoteImage" RENAME TO "NoteImage";
CREATE TABLE "new_UserImage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "altText" TEXT NOT NULL,
    "contentType" TEXT NOT NULL,
    "blob" BLOB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "UserImage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_UserImage" ("altText", "blob", "contentType", "createdAt", "id", "updatedAt", "userId") SELECT "altText", "blob", "contentType", "createdAt", "id", "updatedAt", "userId" FROM "UserImage";
DROP TABLE "UserImage";
ALTER TABLE "new_UserImage" RENAME TO "UserImage";
CREATE UNIQUE INDEX "UserImage_userId_key" ON "UserImage"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
