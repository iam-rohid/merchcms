/*
  Warnings:

  - You are about to drop the column `isValid` on the `EmailVerificationToken` table. All the data in the column will be lost.
  - You are about to drop the column `isValid` on the `ResetPasswordToken` table. All the data in the column will be lost.
  - Added the required column `expiresAt` to the `EmailVerificationToken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiresAt` to the `ResetPasswordToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EmailVerificationToken" DROP COLUMN "isValid",
ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "ResetPasswordToken" DROP COLUMN "isValid",
ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL;
