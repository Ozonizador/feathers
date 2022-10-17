ALTER TABLE profiles 
ADD COLUMN accepts_notification_email boolean default false,
ADD COLUMN accepts_notification_message boolean default false;