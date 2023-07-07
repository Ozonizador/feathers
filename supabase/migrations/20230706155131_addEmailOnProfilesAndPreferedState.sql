ALTER TABLE profiles
    ADD COLUMN email text UNIQUE NULL,
    ADD COLUMN prefered_unidesk_state profiletype DEFAULT 'TENANT' NOT NULL; 