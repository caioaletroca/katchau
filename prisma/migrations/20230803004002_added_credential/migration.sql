-- AlterTable
ALTER TABLE "accounts" ADD COLUMN     "password" TEXT,
ALTER COLUMN "provider_account_id" DROP NOT NULL;
