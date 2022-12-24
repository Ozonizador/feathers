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
    VALUES(uuid_generate_v4(), 'LANDLORD_NEW_REVIEW', host_id);
    RETURN NEW;
END;
$$;

--- 
CREATE OR REPLACE FUNCTION notify_change_reservation()
  RETURNS TRIGGER 
  LANGUAGE PLPGSQL
  AS
$$
BEGIN
    IF NEW.status = 'REJECTED' THEN
      INSERT INTO notifications(id, type, profile_id)
      VALUES(uuid_generate_v4(), 'STUDENT_RESERVATION_ACCEPTED', NEW.tenant_id);
    ELSIF NEW.status = 'ACCEPTED' THEN
      INSERT INTO notifications(id, type, profile_id)
      VALUES(uuid_generate_v4() , 'STUDENT_RESERVATION_ACCEPTED', NEW.tenant_id);
    END IF;

    RETURN NEW;
END;
$$;

---

CREATE OR REPLACE FUNCTION notify_new_reservation()
  RETURNS TRIGGER 
  LANGUAGE PLPGSQL
  AS
$$
DECLARE
    -- Getting the particular part's price
    host_id uuid := (SELECT host_id FROM advertisements where id = NEW.advertisement_id LIMIT 1);
BEGIN
    INSERT INTO conversations(id,host_id,reservation_id,tenant_id, created_at, updated_at) 
    VALUES(uuid_generate_v4(), host_id, NEW.id, NEW.tenant_id, now(), now());

    INSERT INTO notifications(id, type, profile_id)
    VALUES(uuid_generate_v4(), 'LANDLORD_RESERVATION_RECEIVED', host_id);
    RETURN NEW;
END;
$$;