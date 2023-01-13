CREATE TYPE StaysStatus AS ENUM('OK','CHANGED');

ALTER TABLE reservations DROP COLUMN stay_id;
ALTER TABLE stays ALTER COLUMN id SET DEFAULT uuid_generate_v4();
ALTER TABLE stays ADD COLUMN reservation_id uuid REFERENCES reservations(id);
ALTER TABLE stays ADD COLUMN status StaysStatus;
ALTER TABLE stays DROP COLUMN start_date;
ALTER TABLE stays DROP COLUMN end_date;

CREATE OR REPLACE FUNCTION modify_reservation (reservation_id uuid, reservation_status "ReservationStatus", stay_id uuid DEFAULT NULL)
	RETURNS SETOF public.reservations
	LANGUAGE plpgsql
	AS $$
BEGIN
	IF reservation_status = 'ACCEPTED' THEN
		INSERT INTO stays (advertisement_id, tenant_id, reservation_id)
		(SELECT advertisement_id, tenant_id, id as reservation_id FROM reservations WHERE id = reservation_id);
	ELSIF reservation_status = 'CHANGE_ACCEPTED' THEN
		UPDATE
			stays
		SET
			status = 'CHANGED'
		WHERE
			stay_id = stay_id;
		INSERT INTO stays (advertisement_id, tenant_id, reservation_id)
			(SELECT advertisement_id, tenant_id, id as reservation_id FROM reservations WHERE id = reservation_id);
	END IF;
	-- update current reservation
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