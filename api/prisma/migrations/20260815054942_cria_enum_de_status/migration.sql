/*
  Warnings:

  - You are about to alter the column `status` on the `serviceOrder` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `serviceOrder` MODIFY `status` ENUM('open', 'in_progress', 'done') NOT NULL;
