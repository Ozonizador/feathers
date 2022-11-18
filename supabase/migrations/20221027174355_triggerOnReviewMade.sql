CREATE OR REPLACE FUNCTION notify_review_to_landlord()
  RETURNS TRIGGER 
  LANGUAGE PLPGSQL
  AS
$$
DECLARE
    -- Getting the particular part's price
    host_id uuid := (SELECT host_id FROM advertisements INNER JOIN stays on stays.advertisement_id = advertisements.id 
    where id = NEW.stay_id LIMIT 1);
BEGIN

    INSERT INTO notifications(id, type, profile_id)
    VALUES(uuid_generate_v4(), "LANDLORD_NEW_REVIEW", host_id);
    RETURN NEW;
END;
$$;

CREATE TRIGGER notify_review_made
  AFTER INSERT
  ON reviews
  FOR EACH ROW
  EXECUTE PROCEDURE notify_review_to_landlord();
