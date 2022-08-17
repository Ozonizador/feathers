CREATE EXTENSION postgis;

/* being tested */
SELECT AddGeometryColumn ('public','advertisements','geom',4326,'POINT',2);
