ALTER TABLE "stays" DROP CONSTRAINT "stays_reservation_id_fkey",
    ADD CONSTRAINT stays_reservation_id_fkey
    FOREIGN KEY (reservation_id)
    REFERENCES reservations(id)
    ON DELETE CASCADE;

ALTER TABLE "stays" DROP CONSTRAINT "stays_tenant_id_fkey",
    ADD CONSTRAINT stays_tenant_id_fkey
    FOREIGN KEY (tenant_id)
    REFERENCES profiles(id)
    ON DELETE CASCADE;

ALTER TABLE "stays" DROP CONSTRAINT "stays_advertisement_id_fkey",
    ADD CONSTRAINT stays_advertisement_id_fkey
    FOREIGN KEY (advertisement_id)
    REFERENCES advertisements(id)
    ON DELETE CASCADE;

ALTER TABLE "notifications" ADD COLUMN seen BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE "messages" ADD COLUMN seen BOOLEAN NOT NULL DEFAULT FALSE;