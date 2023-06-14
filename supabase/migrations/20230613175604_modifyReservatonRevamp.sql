DROP FUNCTION modify_reservation(uuid, "ReservationStatus", uuid);

CREATE OR REPLACE FUNCTION modify_reservation (reservation_id uuid, reservation_status "ReservationStatus")
	RETURNS SETOF public.reservations
	LANGUAGE plpgsql
	AS $$
BEGIN
	UPDATE
		reservations
	SET
		status = reservation_status
	WHERE
		id = reservation_id;
	RETURN query (
		SELECT
			*
		FROM
			reservations
		WHERE
			id = reservation_id);
END;
$$
SECURITY DEFINER SET search_path = extensions, public, pg_temp;


CREATE OR REPLACE FUNCTION close_advertisements (lat float, lng float)
	RETURNS SETOF public.advertisements
	LANGUAGE plpgsql
	AS $$
BEGIN
	RETURN query (
		SELECT
			*
		FROM
			advertisements_agg_amenities
		WHERE
			ST_DWithin (geom, ST_SetSRID (ST_MakePoint (lng, lat), 4326), 10000));
END;
$$
SECURITY DEFINER SET search_path = extensions, public, pg_temp;