CREATE POLICY "Allow authenticated to insert reports" ON "public"."messages" FOR INSERT TO authenticated WITH CHECK (true)
