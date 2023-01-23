CREATE OR REPLACE FUNCTION notify_review_to_landlord()
  RETURNS TRIGGER 
  LANGUAGE PLPGSQL
  AS
$$
DECLARE
    -- Getting the particular part's price
    host_id uuid := (SELECT host_id FROM advertisements INNER JOIN stays on stays.advertisement_id = advertisements.id 
    where stays.id = NEW.stay_id LIMIT 1);
BEGIN
    INSERT INTO notifications(type, profile_id)
    VALUES('LANDLORD_NEW_REVIEW', host_id);
    RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION notify_new_blog()
  RETURNS TRIGGER 
  LANGUAGE PLPGSQL
  AS
$$
BEGIN
    INSERT INTO notifications (type, profile_id) VALUES ('BLOG', 
    ( SELECT (id)
FROM
	profiles ));
    RETURN NEW;
END;
$$;

DROP TRIGGER "new_blog_post_notification" on reviews;

CREATE TRIGGER new_blog_post_notification
  AFTER INSERT
  ON blogs
  FOR EACH ROW
  EXECUTE PROCEDURE notify_new_blog();