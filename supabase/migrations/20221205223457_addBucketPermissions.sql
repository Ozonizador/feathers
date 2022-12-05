create policy "Public Access"
on storage.objects for select
using ( bucket_id = 'advertisements' );

create policy "Public Access"
on storage.objects for select
using ( bucket_id = 'avatars' );


