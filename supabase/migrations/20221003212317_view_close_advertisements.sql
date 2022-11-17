CREATE OR REPLACE FUNCTION close_advertisements (lat float, lng float)
	RETURNS SETOF public.advertisements
	LANGUAGE plpgsql
	AS $$
BEGIN
	RETURN query (
		SELECT
			*
		FROM
			advertisements
		WHERE
			ST_DWithin (geom, ST_SetSRID (ST_MakePoint (lng, lat), 4326), 10000));
END;
$$
SECURITY DEFINER SET search_path = extensions, public, pg_temp;