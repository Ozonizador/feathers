-- CreateEnum
CREATE TYPE "HostFlexType" AS ENUM ('SUPER_FLEX', 'FLEX', 'MODERATE', 'RIGID');

-- CreateEnum
CREATE TYPE "TypeRoom" AS ENUM ('ENTIRE_SPACE', 'SHARED_ROOM', 'PRIVATE_ROOM');

-- CreateEnum
CREATE TYPE "type_host" AS ENUM ('PROFISSIONAL', 'PARTICULAR');

-- CreateEnum
CREATE TYPE "AdvertisementStatus" AS ENUM ('AVAILABLE', 'DISABLED', 'NOT_AVAILABLE');

-- CreateEnum
CREATE TYPE "ReservationStatus" AS ENUM ('REQUESTED', 'ACCEPTED', 'REJECTED', 'CHANGE_REQUESTED', 'CHANGE_ACCEPTED', 'CHANGE_REJECTED');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('STUDENT_EVALUATE_STAY', 'STUDENT_RESERVATION_DECLINED', 'STUDENT_RESERVATION_ACCEPTED', 'STUDENT_UNIHOSTS_SUPPORT', 'STUDENT_COMPLETE_PROFILE', 'LANDLORD_RESERVATION_RECEIVED', 'LANDLORD_UNIHOSTS_SUPPORT', 'LANDLORD_NEW_REVIEW', 'LANDLORD_COMPLETE_PROFILE', 'LANDLORD_COMPLETE_ADVERT', 'BLOG');

-- CreateEnum
CREATE TYPE "ReportsType" AS ENUM ('IMPRECISE', 'NOT_REALITY', 'SCAM', 'OFFENSIVE', 'OTHER');

-- CreateEnum
CREATE TYPE "BlogCategory" AS ENUM ('LANDLORD', 'TENANT');

-- CreateTable
CREATE TABLE "profiles" (
    "id" UUID NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT,
    "surname" TEXT,
    "nationality" TEXT,
    "town" TEXT,
    "birth_date" DATE,
    "gender" INTEGER,
    "description" TEXT,
    "languages" TEXT[],
    "phone" TEXT,
    "avatar_url" TEXT,
    "favourite_rooms" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "advertisements" (
    "id" UUID NOT NULL,
    "slug" TEXT NOT NULL,
    "type" "TypeRoom" NOT NULL,
    "place" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "street_number" TEXT NOT NULL,
    "floor" TEXT,
    "postal_code" TEXT NOT NULL,
    "rooms" INTEGER NOT NULL,
    "max_rooms" INTEGER NOT NULL DEFAULT 1,
    "beds" INTEGER NOT NULL,
    "tenant_number" INTEGER NOT NULL,
    "bathrooms" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type_flex_host" "HostFlexType" NOT NULL,
    "type_host" "type_host" NOT NULL,
    "photos" JSONB NOT NULL DEFAULT '[]',
    "house_rules" JSONB NOT NULL,
    "about_house" JSONB NOT NULL,
    "month_rent" INTEGER NOT NULL,
    "extra_per_host" INTEGER NOT NULL,
    "guarantee_value" INTEGER NOT NULL,
    "expenses" JSONB NOT NULL,
    "available" "AdvertisementStatus" NOT NULL,
    "host_lives_property" BOOLEAN NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "host_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "advertisements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reservations" (
    "id" UUID NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,
    "advertisement_id" UUID NOT NULL,
    "status" "ReservationStatus" NOT NULL,
    "tenant_id" UUID NOT NULL,
    "stay_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reservations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" UUID NOT NULL,
    "stay_id" UUID NOT NULL,
    "overall_rating" INTEGER NOT NULL,
    "location_rating" INTEGER NOT NULL,
    "value_quality_rating" INTEGER NOT NULL,
    "landlord_rating" INTEGER NOT NULL,
    "comodities_rating" INTEGER NOT NULL,
    "public_review" TEXT NOT NULL,
    "private_review" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "profile_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conversations" (
    "id" UUID NOT NULL,
    "host_id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "reservation_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "conversations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" UUID NOT NULL,
    "message" TEXT NOT NULL,
    "conversation_id" UUID NOT NULL,
    "profile_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reports" (
    "id" UUID NOT NULL,
    "advertisement_id" UUID NOT NULL,
    "stay_id" UUID NOT NULL,
    "description" TEXT NOT NULL,
    "type" "ReportsType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stays" (
    "id" UUID NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "advertisement_id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "stays_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blogs" (
    "id" UUID NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "category" "BlogCategory" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "blogs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profiles_slug_key" ON "profiles"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "advertisements_slug_key" ON "advertisements"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "reviews_stay_id_key" ON "reviews"("stay_id");

-- CreateIndex
CREATE UNIQUE INDEX "conversations_reservation_id_key" ON "conversations"("reservation_id");

-- CreateIndex
CREATE UNIQUE INDEX "reports_stay_id_key" ON "reports"("stay_id");

-- CreateIndex
CREATE UNIQUE INDEX "blogs_slug_key" ON "blogs"("slug");

-- AddForeignKey
ALTER TABLE "advertisements" ADD CONSTRAINT "advertisements_host_id_fkey" FOREIGN KEY ("host_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_advertisement_id_fkey" FOREIGN KEY ("advertisement_id") REFERENCES "advertisements"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_stay_id_fkey" FOREIGN KEY ("stay_id") REFERENCES "stays"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_stay_id_fkey" FOREIGN KEY ("stay_id") REFERENCES "stays"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_host_id_fkey" FOREIGN KEY ("host_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_reservation_id_fkey" FOREIGN KEY ("reservation_id") REFERENCES "reservations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "conversations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_advertisement_id_fkey" FOREIGN KEY ("advertisement_id") REFERENCES "advertisements"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_stay_id_fkey" FOREIGN KEY ("stay_id") REFERENCES "stays"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stays" ADD CONSTRAINT "stays_advertisement_id_fkey" FOREIGN KEY ("advertisement_id") REFERENCES "advertisements"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stays" ADD CONSTRAINT "stays_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
