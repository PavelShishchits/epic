SELECT "User"."id", "User"."name", "User"."username", "UserImage"."id" AS "imageId"
FROM "User"
LEFT JOIN "UserImage" ON "UserImage"."userId" = "User"."id"
WHERE "User"."username" ILIKE $1 OR "User"."name" ILIKE $1
ORDER BY COALESCE((
  SELECT "Note"."updatedAt"
  FROM "Note"
  WHERE "Note"."ownerId" = "User"."id"
  ORDER BY "Note"."updatedAt" DESC
  LIMIT 1
), '1970-01-01') DESC
LIMIT 50