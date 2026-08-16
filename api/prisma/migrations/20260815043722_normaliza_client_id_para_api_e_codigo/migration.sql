/*
  Warnings:

  - You are about to drop the column `clientId` on the `serviceOrder` table. All the data in the column will be lost.
  - Added the required column `client_id` to the `serviceOrder` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `serviceOrder` DROP FOREIGN KEY `serviceOrder_clientId_fkey`;

-- DropIndex
DROP INDEX `serviceOrder_clientId_fkey` ON `serviceOrder`;

-- AlterTable
ALTER TABLE `serviceOrder` DROP COLUMN `clientId`,
    ADD COLUMN `client_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `serviceOrder` ADD CONSTRAINT `serviceOrder_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
