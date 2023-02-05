CREATE OR REPLACE FUNCTION average_rating_per_host (hostId uuid)
	RETURNS float -- i do not know.
	LANGUAGE plpgsql
	AS $$
BEGIN
	RETURN query (
		SELECT
			avg(overall_rating)
		FROM
			reviews
			INNER JOIN stays ON stays.id = reviews.stay_id
			INNER JOIN advertisements ON advertisements.id = stays.advertisement_id WHERE advertisements.host_id = hostId));
END;
$$
SECURITY DEFINER SET search_path = extensions, public, pg_temp;

CREATE OR REPLACE VIEW response_rate_per_host ()


