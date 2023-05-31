CREATE TABLE zones (
  id SERIAL PRIMARY KEY,
  value VARCHAR(255)
);

CREATE TABLE commodities (
  id SERIAL PRIMARY KEY,
  value VARCHAR(255)
);


CREATE TABLE advertisement_zones (
  advertisement_id uuid REFERENCES advertisements(id),
  zone_id INT REFERENCES zones(id),
  comodity_id INT REFERENCES commodities(id),
  PRIMARY KEY (advertisement_id, zone_id)
);

ALTER TABLE advertisements DROP COLUMN about_house;