CREATE OR REPLACE FUNCTION notify_change_reservation()
  RETURNS TRIGGER 
  LANGUAGE PLPGSQL
  AS
$$
BEGIN
    IF NEW.status = 'REJECTED' THEN
      INSERT INTO notifications(id, type, profile_id)
      VALUES(uuid_generate_v4(), "STUDENT_RESERVATION_ACCEPTED", NEW.tenant_id);
    ELSIF NEW.status = 'ACCEPTED' THEN
      INSERT INTO notifications(id, type, profile_id)
      VALUES(uuid_generate_v4() , "STUDENT_RESERVATION_ACCEPTED", NEW.tenant_id);
    END IF;

    RETURN NEW;
END;
$$;

CREATE TRIGGER update_reservation_made
  AFTER UPDATE
  ON reservations
  FOR EACH ROW
  EXECUTE PROCEDURE notify_change_reservation();
