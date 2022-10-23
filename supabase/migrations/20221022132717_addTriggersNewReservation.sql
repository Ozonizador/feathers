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

    INSERT INTO notifications(id,title,description, type, profile_id)
    VALUES(uuid_generate_v4(), 'Tens uma novo pedido de reserva!', 'Responde à consulta nas próximas 24 horas!' , "LANDLORD_RESERVATION_RECEIVED" ,host_id);
    RETURN NEW;
END;
$$;

CREATE TRIGGER new_reservation_made
  AFTER INSERT
  ON reservations
  FOR EACH ROW
  EXECUTE PROCEDURE notify_new_reservation();
