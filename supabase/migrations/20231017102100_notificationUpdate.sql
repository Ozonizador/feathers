CREATE POLICY "Allow authenticated to update notification" 
ON "public"."notifications" FOR UPDATE TO authenticated WITH CHECK (true)
