CREATE TYPE PaymentType AS ENUM ('MULTIBANCO', 'MBWAY');
CREATE TYPE PaymentStatus AS ENUM ('GENERATED', 'PAID', 'REJECTED', 'EXPIRED');

CREATE TABLE reservation_payments (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "reservation_id" UUID NOT NULL REFERENCES reservations(id) UNIQUE,
    "payment_type" PaymentType NOT NULL, 
    "referencia" TEXT NOT NULL,
    "entidade" TEXT NULL,
    "valor" INTEGER NOT NULL,
    "estado" PaymentStatus NOT NULL,
    "metadata" JSON NOT NULL DEFAULT '{}',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reservation_payments_pkey" PRIMARY KEY ("id")
);