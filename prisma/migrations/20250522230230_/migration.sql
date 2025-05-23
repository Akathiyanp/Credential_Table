-- CreateTable
CREATE TABLE "CredentialTable" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "appId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "secret" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CredentialTable_pkey" PRIMARY KEY ("id")
);
