--- SELECTS

CREATE POLICY "Allow everyone to read advertisements" ON "public"."advertisements" FOR SELECT USING (true);
CREATE POLICY "Allow everyone to read blogs" ON "public"."blogs" FOR SELECT USING (true);
CREATE POLICY "Allow authenticated to read conversations" ON "public"."conversations" FOR SELECT TO authenticated USING(true);
CREATE POLICY "Allow authenticated to read messages" ON "public"."messages" FOR SELECT TO authenticated USING(true);
CREATE POLICY "Allow authenticated to read notifications" ON "public"."notifications" FOR SELECT TO authenticated USING (("auth"."uid"() = "profile_id"));
CREATE POLICY "Allow everyone to read profiles" ON "public"."profiles" FOR SELECT USING(true);
CREATE POLICY "Allow everyone to read reviews" ON "public"."reviews" FOR SELECT USING(true);
CREATE POLICY "Allow authenticated to read reservations" ON "public"."reservations" FOR SELECT TO authenticated USING(true);
CREATE POLICY "Allow authenticated to read stays" ON "public"."stays" FOR SELECT TO authenticated USING(true);

-- INSERTS
CREATE POLICY "Allow authenticated to create reservations" ON "public"."reservations" FOR INSERT TO authenticated WITH CHECK(true);
CREATE POLICY "Allow postgres to create conversations" ON "public"."conversations" FOR INSERT TO postgres, authenticated WITH CHECK(true);
CREATE POLICY "Allow postgres to create notifications" ON "public"."notifications" FOR INSERT to postgres, authenticated WITH CHECK(true);

-- UPDATES 

-- DELETES 
