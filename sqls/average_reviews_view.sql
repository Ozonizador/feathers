DROP VIEW IF EXISTS "reviewsPerAdvertisement";

CREATE VIEW "reviewsPerAdvertisement" AS
    SELECT "advertisement_id", 
     COUNT(*) AS "review_number",
     AVG("overall_rating")::numeric(10,2)  AS "overall_average",
     AVG("location_rating")::numeric(10,2)  AS "location_average",
     AVG("value_quality_rating")::numeric(10,2)  AS "value_quality_average", 
     AVG("landlord_rating")::numeric(10,2)  AS "landlord_average", 
     AVG("comodities_rating")::numeric(10,2)  AS "comodities_average"
    FROM reviews LEFT JOIN stays on reviews.stay_id = stays.id GROUP BY "advertisement_id";