create or replace function close_advertisements(lat float, lng float) returns setof public.advertisements as $$
SELECT * FROM advertisements WHERE ST_DWithin(geom, ST_MakePoint(lng,lat), 10000)
$$ language sql;

