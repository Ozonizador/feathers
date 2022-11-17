CREATE OR REPLACE FUNCTION public.average_per_host (host uuid)
	RETURNS int
	LANGUAGE plpgsql
	AS $$
BEGIN
	SELECT
		AVG("overall_rating")
	FROM
		reviews
		JOIN stays ON stays.id = reviews.stay_id
		JOIN advertisements ON advertisements.id = stays.advertisement_id
	WHERE
		advertisements.host_id = host;
END;
$$
SECURITY DEFINER SET search_path = extensions, public, pg_temp;