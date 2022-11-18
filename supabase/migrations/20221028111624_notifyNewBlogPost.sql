CREATE OR REPLACE FUNCTION notify_new_blog()
  RETURNS TRIGGER 
  LANGUAGE PLPGSQL
  AS
$$
BEGIN
    INSERT INTO notifications (id, type, profile_id) VALUES ( uuid_generate_v4 (),
		'BLOG', ( SELECT
	(id)
FROM
	profiles ));
    RETURN NEW;
END;
$$;

CREATE TRIGGER new_blog_post_notification
  AFTER INSERT
  ON reviews
  FOR EACH ROW
  EXECUTE PROCEDURE notify_new_blog();
