DROP VIEW IF EXISTS "reviewsPerAdvertisement";

CREATE TYPE payment_status_type AS ENUM ('NOT_GENERATED', 'PENDING', 'PAID', 'REJECTED');

ALTER TABLE reports DROP CONSTRAINT "reports_stay_id_fkey";

ALTER TABLE reports DROP COLUMN stay_id;
ALTER TABLE reports ADD COLUMN reservation_id uuid NOT NULL;
ALTER TABLE reports ADD CONSTRAINT "reports_reservation_id_fkey" FOREIGN KEY ("reservation_id") REFERENCES reservations(id) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE reviews DROP COLUMN stay_id;
ALTER TABLE reviews ADD COLUMN reservation_id uuid NOT NULL;
ALTER TABLE reviews ADD CONSTRAINT "reviews_reservation_id_fkey" FOREIGN KEY ("reservation_id") REFERENCES reservations(id) ON DELETE RESTRICT ON UPDATE CASCADE;


DROP TABLE stays;

ALTER TABLE reservations 
    ADD COLUMN payment_status payment_status_type DEFAULT 'NOT_GENERATED',
    ADD COLUMN previous_stay uuid REFERENCES reservations(id) DEFAULT NULL;

CREATE VIEW "reviewsPerAdvertisement" AS
    SELECT "advertisement_id", 
     COUNT(*) AS "review_number",
     AVG("overall_rating")::numeric(10,2)  AS "overall_average",
     AVG("location_rating")::numeric(10,2)  AS "location_average",
     AVG("value_quality_rating")::numeric(10,2)  AS "value_quality_average", 
     AVG("landlord_rating")::numeric(10,2)  AS "landlord_average", 
     AVG("comodities_rating")::numeric(10,2)  AS "comodities_average"
    FROM reviews LEFT JOIN reservations on reviews.reservation_id = reservations.id GROUP BY "advertisement_id";

/** function */

CREATE OR REPLACE FUNCTION notify_review_to_landlord()
  RETURNS TRIGGER 
  LANGUAGE PLPGSQL
  AS
$$
DECLARE
    -- Getting the particular part's price
    host_id uuid := (SELECT host_id FROM advertisements INNER JOIN reservations on reservations.advertisement_id = advertisements.id 
    where reservations.id = NEW.reservation_id LIMIT 1);
BEGIN
    INSERT INTO notifications(type, profile_id)
    VALUES('LANDLORD_NEW_REVIEW', host_id);
    RETURN NEW;
END;
$$;