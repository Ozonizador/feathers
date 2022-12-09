insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true);

insert into storage.buckets (id, name, public)
values ('advertisements', 'advertisements', true);

create policy "Rescricted Insert for Avatars"
on storage.objects for insert
with check (
  bucket_id = 'avatars'
  and auth.role() = 'authenticated'
);

create policy "Rescricted Insert for Advertisements"
on storage.objects for insert
with check (
  bucket_id = 'advertisements'
  and auth.role() = 'authenticated'
);