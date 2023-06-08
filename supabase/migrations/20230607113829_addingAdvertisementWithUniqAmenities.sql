CREATE VIEW "advertisements_agg_amenities" AS
    SELECT 
        advertisements.*, 
        ARRAY_AGG(DISTINCT amenities_agg.amenities) as amenities
    FROM advertisements INNER JOIN (
        SELECT id, 
                unnest(array_cat(
                    array_cat(
                        array_cat(
                            array_cat(
                                array_cat("kitchen_amenities", "general_amenities"), 
                            "bedroom_amenities"),
                        "bathroom_amenities"), 
                    "livingroom_amenities"), 
                "exterior_amenities")) as amenities
        FROM advertisements ) as amenities_agg 
        ON amenities_agg.id = advertisements.id 
        GROUP BY advertisements.id;