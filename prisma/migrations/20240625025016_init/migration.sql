-- CreateTable
CREATE TABLE "City" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SPK" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "clientCompanyName" TEXT NOT NULL,
    "projectName" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "cityId" TEXT NOT NULL,

    CONSTRAINT "SPK_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bill" (
    "id" TEXT NOT NULL,
    "billSequence" SERIAL NOT NULL,
    "receiptSequence" SERIAL NOT NULL,
    "issuer" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "amount" INTEGER NOT NULL,
    "vat" INTEGER NOT NULL,
    "receiver" TEXT NOT NULL,
    "spkId" TEXT NOT NULL,

    CONSTRAINT "Bill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SignedInvoice" (
    "id" TEXT NOT NULL,
    "docId" TEXT NOT NULL,
    "billId" TEXT NOT NULL,

    CONSTRAINT "SignedInvoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SignedReceipt" (
    "id" TEXT NOT NULL,
    "billId" TEXT NOT NULL,

    CONSTRAINT "SignedReceipt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SPK_number_key" ON "SPK"("number");

-- AddForeignKey
ALTER TABLE "SPK" ADD CONSTRAINT "SPK_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bill" ADD CONSTRAINT "Bill_spkId_fkey" FOREIGN KEY ("spkId") REFERENCES "SPK"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SignedInvoice" ADD CONSTRAINT "SignedInvoice_billId_fkey" FOREIGN KEY ("billId") REFERENCES "Bill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SignedReceipt" ADD CONSTRAINT "SignedReceipt_billId_fkey" FOREIGN KEY ("billId") REFERENCES "Bill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
