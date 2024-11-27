-- CreateTable
CREATE TABLE "AuthSession" (
    "key" TEXT NOT NULL,
    "session" TEXT NOT NULL,

    CONSTRAINT "AuthSession_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "AuthState" (
    "key" TEXT NOT NULL,
    "state" TEXT NOT NULL,

    CONSTRAINT "AuthState_pkey" PRIMARY KEY ("key")
);
