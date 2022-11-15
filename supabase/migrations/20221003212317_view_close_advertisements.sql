create or replace function public.close_advertisements(lat float, lng float) returns setof public.advertisements as $$
SELECT * FROM advertisements WHERE ST_DWithin(geom, ST_SetSRID(ST_MakePoint(lng,lat),4326), 10000)
$$ language sql;

