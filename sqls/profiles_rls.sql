ALTER TABLE public.profiles
  ENABLE ROW LEVEL SECURITY;

-- do on supabase api
create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );


-- do on supabase api
create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- inserts a row into public.users
create function public.handle_new_user() 
returns trigger 
language plpgsql 
security definer set search_path = public
as $$
begin
  insert into public.profiles (id)
  values (new.uid);
  return new;
end;
$$;

-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();