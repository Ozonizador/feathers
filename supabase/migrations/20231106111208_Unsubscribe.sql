CREATE TABLE "deactivation" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "reason" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "deactivation_pkey" PRIMARY KEY ("id")
)