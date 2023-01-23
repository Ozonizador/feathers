CREATE OR REPLACE FUNCTION notify_new_blog()
  RETURNS TRIGGER 
  LANGUAGE PLPGSQL
  AS
$$
BEGIN
    INSERT INTO notifications (type, profile_id) VALUES ('BLOG', ( SELECT
	(id)
FROM
	profiles ));
    RETURN NEW;
END;
$$;

CREATE TRIGGER new_blog_post_notification
  AFTER INSERT
  ON blogs
  FOR EACH ROW
  EXECUTE PROCEDURE notify_new_blog();
