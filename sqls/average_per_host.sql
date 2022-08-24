create or replace function average_per_host(host uuid) returns int as $$
   select AVG("overallRating") FROM reviews JOIN stays on stays.id = reviews."stayId" JOIN advertisements on advertisements.id = stays."advertisementId" WHERE advertisements."hostId" = host
$$ language sql;