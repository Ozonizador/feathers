CREATE VIEW "average_reviews" AS
    SELECT "AVG(overallRating)" AS overallAverage ,
     "AVG(locationRating)" AS locationAverage,
     "AVG(valueQualityRating)" AS valueQualityAverage, 
     "AVG(landLordRating)" AS landlordAverage, 
     "AVG(comoditiesRating)" AS comoditiesAverage
    FROM "referrals";