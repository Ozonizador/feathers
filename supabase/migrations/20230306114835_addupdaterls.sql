CREATE POLICY "Allow authenticated to update its own profile" ON "public"."profiles" FOR UPDATE TO authenticated USING (auth.uid() = id);


--- alter table profiles
CREATE TYPE ProfileType AS ENUM ('LANDLORD', 'TENANT');
ALTER TABLE profiles ADD COLUMN type ProfileType NULL;