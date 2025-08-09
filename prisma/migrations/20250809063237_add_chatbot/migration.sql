-- CreateTable
CREATE TABLE "public"."Chat" (
    "id" TEXT NOT NULL,
    "userInput" TEXT NOT NULL,
    "botReply" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);
