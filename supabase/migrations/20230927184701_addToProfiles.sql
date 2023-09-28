CREATE POLICY "Allow authenticated to create profile" 
ON "public"."profiles" FOR INSERT TO authenticated WITH CHECK (true)
