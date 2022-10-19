create EXTENSION postgis schema extensions;

SELECT AddGeometryColumn ('public','advertisements','geom',4326,'POINT',2);
