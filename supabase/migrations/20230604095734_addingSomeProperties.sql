ALTER TABLE advertisements 
    ADD COLUMN  minimum_stay int NOT NULL DEFAULT 3,
    ADD COLUMN time_in_advance int NOT NULL DEFAULT 1, 
    ADD COLUMN trimester_discount int NOT NULL DEFAULT 0, 
    ADD COLUMN semester_discount int NOT NULL DEFAULT 0;

