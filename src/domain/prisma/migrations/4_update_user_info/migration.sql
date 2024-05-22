-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user_info" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "cityId" INTEGER,
    "countryId" INTEGER,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "avatar" TEXT,
    "gender" TEXT NOT NULL,
    "dateOfBirth" DATETIME NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "documentType" TEXT NOT NULL,
    "documentNumber" TEXT NOT NULL,
    "address" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "user_info_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "user_info_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "cities" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "user_info_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_user_info" ("address", "avatar", "cityId", "countryId", "createdAt", "dateOfBirth", "documentNumber", "documentType", "firstName", "gender", "id", "lastName", "phoneNumber", "updatedAt", "userId") SELECT "address", "avatar", "cityId", "countryId", "createdAt", "dateOfBirth", "documentNumber", "documentType", "firstName", "gender", "id", "lastName", "phoneNumber", "updatedAt", "userId" FROM "user_info";
DROP TABLE "user_info";
ALTER TABLE "new_user_info" RENAME TO "user_info";
CREATE UNIQUE INDEX "user_info_userId_key" ON "user_info"("userId");
PRAGMA foreign_key_check("user_info");
PRAGMA foreign_keys=ON;
