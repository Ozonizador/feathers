ALTER TABLE advertisements DROP COLUMN about_house;

ALTER TABLE advertisements ADD COLUMN kitchen_amenities TEXT[],
                            ADD COLUMN general_amenities TEXT[],
                            ADD COLUMN bedroom_amenities TEXT[],
                            ADD COLUMN bathroom_amenities TEXT[],
                            ADD COLUMN livingroom_amenities TEXT[],
                            ADD COLUMN exterior_amenities TEXT[];
