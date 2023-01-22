ALTER TABLE stays ALTER COLUMN status SET DEFAULT 'OK';

CREATE VIEW stays_with_dates AS
SELECT
	stays.*,
	reservations.start_date,
	reservations.end_date
FROM
	stays
	INNER JOIN reservations ON reservations.id = stays.reservation_id;