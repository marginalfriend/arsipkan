-- CreateTable
CREATE TABLE "Developer" (
    "id" TEXT NOT NULL,
    "folder_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Developer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "folder_id" TEXT NOT NULL,
    "developer_id" TEXT NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "WorkType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "project_name" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "folder_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BudgetProposal" (
    "id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "proposal_number" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "doc_id" TEXT NOT NULL,

    CONSTRAINT "BudgetProposal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShopDrawing" (
    "id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "doc_id" TEXT NOT NULL,

    CONSTRAINT "ShopDrawing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SPK" (
    "id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "spk_number" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "doc_id" TEXT NOT NULL,

    CONSTRAINT "SPK_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bill" (
    "id" TEXT NOT NULL,
    "bill_sequence" SERIAL NOT NULL,
    "receipt_sequence" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "amount" INTEGER NOT NULL,
    "vat" INTEGER NOT NULL,
    "project_id" TEXT NOT NULL,

    CONSTRAINT "Bill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Receipt" (
    "id" TEXT NOT NULL,
    "doc_id" TEXT NOT NULL,
    "bill_id" TEXT NOT NULL,

    CONSTRAINT "Receipt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "doc_id" TEXT NOT NULL,
    "bill_id" TEXT NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Minutes" (
    "id" TEXT NOT NULL,
    "doc_id" TEXT NOT NULL,
    "bill_id" TEXT NOT NULL,

    CONSTRAINT "Minutes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProgressVolume" (
    "id" TEXT NOT NULL,
    "doc_id" TEXT NOT NULL,
    "bill_id" TEXT NOT NULL,

    CONSTRAINT "ProgressVolume_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SignedInvoice" (
    "id" TEXT NOT NULL,
    "doc_id" TEXT NOT NULL,
    "bill_id" TEXT NOT NULL,

    CONSTRAINT "SignedInvoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SignedReceipt" (
    "id" TEXT NOT NULL,
    "bill_id" TEXT NOT NULL,

    CONSTRAINT "SignedReceipt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BudgetProposal_project_id_key" ON "BudgetProposal"("project_id");

-- CreateIndex
CREATE UNIQUE INDEX "ShopDrawing_project_id_key" ON "ShopDrawing"("project_id");

-- CreateIndex
CREATE UNIQUE INDEX "SPK_project_id_key" ON "SPK"("project_id");

-- CreateIndex
CREATE UNIQUE INDEX "SPK_spk_number_key" ON "SPK"("spk_number");

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_developer_id_fkey" FOREIGN KEY ("developer_id") REFERENCES "Developer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetProposal" ADD CONSTRAINT "BudgetProposal_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShopDrawing" ADD CONSTRAINT "ShopDrawing_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SPK" ADD CONSTRAINT "SPK_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bill" ADD CONSTRAINT "Bill_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receipt" ADD CONSTRAINT "Receipt_bill_id_fkey" FOREIGN KEY ("bill_id") REFERENCES "Bill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_bill_id_fkey" FOREIGN KEY ("bill_id") REFERENCES "Bill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Minutes" ADD CONSTRAINT "Minutes_bill_id_fkey" FOREIGN KEY ("bill_id") REFERENCES "Bill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgressVolume" ADD CONSTRAINT "ProgressVolume_bill_id_fkey" FOREIGN KEY ("bill_id") REFERENCES "Bill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SignedInvoice" ADD CONSTRAINT "SignedInvoice_bill_id_fkey" FOREIGN KEY ("bill_id") REFERENCES "Bill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SignedReceipt" ADD CONSTRAINT "SignedReceipt_bill_id_fkey" FOREIGN KEY ("bill_id") REFERENCES "Bill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
