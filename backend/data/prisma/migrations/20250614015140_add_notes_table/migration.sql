-- CreateTable
CREATE TABLE "Note" (
    "id" TEXT NOT NULL,
    "loginId" TEXT NOT NULL,
    "book" TEXT NOT NULL,
    "chapter" INTEGER,
    "verse" INTEGER,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Note_loginId_book_chapter_verse_idx" ON "Note"("loginId", "book", "chapter", "verse");
