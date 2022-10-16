create or replace function average_per_host(host uuid) returns int as $$
   select AVG("overall_rating") FROM reviews JOIN stays on stays.id = reviews.stay_id JOIN advertisements on advertisements.id = stays.advertisement_id WHERE advertisements.host_id = host
$$ language sql;