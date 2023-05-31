CREATE TABLE zones (
  id SERIAL PRIMARY KEY,
  value VARCHAR(255)
);

CREATE TABLE commodities (
  id SERIAL PRIMARY KEY,
  value VARCHAR(255)
);


CREATE TABLE advertisements_commodities (
  advertisement_id uuid REFERENCES advertisements(id),
  zone_id INT REFERENCES zones(id),
  comodity_id INT REFERENCES commodities(id),
  PRIMARY KEY (advertisement_id, zone_id)
);

ALTER TABLE advertisements DROP COLUMN about_house;

INSERT INTO zones (value) VALUES ('general'),('kitchen'),('bedroom'), ('bathoom'), ('livingroom'), ('exterior');

INSERT INTO commodities (value) VALUES ('SOFA'),
  ('TV'),
  ('FIREPLACE'),
  ('TABLE'),
  ('CHAIRS'),
  ('WIFI'),
  ('ELEVADOR'),
  ('AIR_CONDITIONING'),
  ('WASHING_MACHINE'),
  ('MIRROR'),
  ('FRIDGE'),
  ('SINGLE_BED'),
  ('DOUBLE_BED'),
  ('MICROWAVE'),
  ('TOASTER'),
  ('COFFEE_MAKER'),
  ('HEATING'),
  ('IRON_BOARD'),
  ('ESTENDAL'),
  ('LIVING_ROOM'),
  ('BALCONY'),
  ('SWIMMING_POOL'),
  ('PARKING_SPOT'),
  ('COURTYARD'),
  ('TERRACE'),
  ('BARBECUE'),
  ('FREEZER'),
  ('OVEN'),
  ('STOVE'),
  ('EXAUSTOR_FAN'),
  ('DRYER'),
  ('BATHTUB'),
  ('SHOWER'),
  ('PRIVATE_BATHROOM'),
  ('SHARED_BATHROOM'),
  ('CUTLERY'),
  ('DESK'),
  ('PILLOWS'),
  ('BED_SHEETS'),
  ('BLACKOUTS'),
  ('GARBAGE_CAN'),
  ('LAUNDRY_MACHINE'),
  ('MEAL_ZONE'),
  ('BASIC_UTILIES'),
  ('KEY_TO_LOCK_DOOR'),
  ('HANGERS_SUPPORT'),
  ('HOT_WATER_KETTLE'),
  ('POWER_PLUG_NEAR_BED')