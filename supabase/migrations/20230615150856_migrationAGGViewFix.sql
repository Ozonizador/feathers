DROP FUNCTION close_advertisements(float, float);
DROP VIEW "advertisements_agg_amenities";

CREATE VIEW "advertisements_agg_amenities" AS
    SELECT 
        advertisements.*, 
        ARRAY_AGG(DISTINCT amenities_agg.amenities) as amenities
    FROM advertisements LEFT JOIN (
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

CREATE OR REPLACE FUNCTION close_advertisements (lat float, lng float)
	RETURNS SETOF public.advertisements_agg_amenities
	LANGUAGE plpgsql
	AS $$
BEGIN
	RETURN query (
		SELECT
			*
		FROM
			advertisements_agg_amenities
		WHERE
        
			ST_DWithin (geom::geography, ST_SetSRID (ST_MakePoint (lng, lat), 4326)::geography, 10000));
END;
$$
SECURITY DEFINER SET search_path = extensions, public, pg_temp;