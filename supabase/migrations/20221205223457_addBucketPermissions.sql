create policy "Public Access advertisements"
on storage.objects for select
using ( bucket_id = 'advertisements' );

create policy "Public Access for avatars"
on storage.objects for select
using ( bucket_id = 'avatars' );

CREATE POLICY "access for insert object"
ON storage.objects
FOR INSERT 
TO authenticated 
WITH CHECK (true);