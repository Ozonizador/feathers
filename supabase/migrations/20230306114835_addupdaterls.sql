-- policies profile

CREATE POLICY "Allow authenticated to update its own profile" ON "public"."profiles" FOR UPDATE TO authenticated USING (auth.uid() = id);


-- policies advertisment

CREATE POLICY "Allow authenticated to update its own advertisements" ON "public"."advertisements" FOR UPDATE TO authenticated USING (auth.uid() = host_id);
CREATE POLICY "Allow authenticated to insert advertisements" ON "public"."advertisements" FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated to delete advertisements" ON "public"."advertisements" FOR DELETE TO authenticated USING (auth.uid() = host_id);

--- policies reviews todo: check if possible to check if exists foreign table

CREATE POLICY "Allow authenticated to insert reviews" ON "public"."reviews" FOR INSERT TO authenticated WITH CHECK (true);


--- policies reports 
CREATE POLICY "Allow authenticated to insert reports" ON "public"."reports" FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow everyone to read reports" ON "public"."reports" FOR SELECT TO authenticated USING (true);


--- alter table profiles
CREATE TYPE ProfileType AS ENUM ('LANDLORD', 'TENANT');
ALTER TABLE profiles ADD COLUMN type ProfileType NULL;

-- alter table reservations
ALTER TABLE reservations ADD COLUMN number_guests int NOT NULL DEFAULT 0;   

-- alter table advertisements removing max_rooms
ALTER TABLE advertisements DROP COLUMN max_rooms;



--- ALTER TABLE ON DELETE CASCADE. 
-- advertisements , reviews, reports
ALTER TABLE "reservations" DROP CONSTRAINT "reservations_advertisement_id_fkey",
ADD CONSTRAINT reservations_advertisement_id_fkey
   foreign key (advertisement_id)
   references advertisements(id)
   on delete cascade;

ALTER TABLE "reports" DROP CONSTRAINT "reports_advertisement_id_fkey",
    FOREIGN KEY reports_stay_id_fkey
    REFERENCES advertisements(id)
    ON DELETE CASCADE;

ALTER TABLE "stays" DROP CONSTRAINT "stays_advertisement_id_fkey",
    FOREIGN KEY stays_advertisement_id_fkey
    REFERENCES advertisements(id)
    ON DELETE CASCADE;