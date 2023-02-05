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

CREATE OR REPLACE FUNCTION host_general_info (hostId uuid)
	RETURNS TABLE (
		number_conversations integer, conversations_answered integer)
	LANGUAGE sql
	AS $$
	SELECT
		*
	FROM (
		SELECT
			COUNT(*) AS number_conversations
		FROM
			conversations
		WHERE
			host_id = hostId) AS number_conversations, (
		SELECT
			COUNT(DISTINCT conversation_id) AS conversations_answered
		FROM
			messages
		WHERE
			profile_id = hostId) AS messages_per_host
$$
SECURITY DEFINER SET search_path = extensions, public, pg_temp;
