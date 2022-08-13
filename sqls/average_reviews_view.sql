DROP VIEW "reviewsPerAdvertisement";

CREATE VIEW "reviewsPerAdvertisement" AS
    SELECT "advertisementId", 
     COUNT(*) AS "reviewNumber",
     AVG("overallRating")::numeric(10,2)  AS "overallAverage",
     AVG("locationRating")::numeric(10,2)  AS "locationAverage",
     AVG("valueQualityRating")::numeric(10,2)  AS "valueQualityAverage", 
     AVG("landLordRating")::numeric(10,2)  AS "landlordAverage", 
     AVG("comoditiesRating")::numeric(10,2)  AS "comoditiesAverage"
    FROM reviews GROUP BY "advertisementId";
