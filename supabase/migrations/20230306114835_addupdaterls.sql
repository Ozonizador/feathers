CREATE POLICY "Allow authenticated to update its own profile" ON "public"."profiles" FOR UPDATE TO authenticated USING (auth.uid() = id);
CREATE POLICY "Allow authenticated to update its own advertisements" ON "public"."advertisements" FOR UPDATE TO authenticated USING (auth.uid() = host_id);


--- alter table profiles
CREATE TYPE ProfileType AS ENUM ('LANDLORD', 'TENANT');
ALTER TABLE profiles ADD COLUMN type ProfileType NULL;

-- alter table reservations
ALTER TABLE reservations ADD COLUMN number_guests int NOT NULL DEFAULT 0;   