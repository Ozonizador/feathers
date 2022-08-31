/* JSON Representation */
export type JSONValue = string | number | boolean | JSONObject | JSONArray;

interface JSONObject {
  [x: string]: JSONValue;
}

type JSONArray = Array<JSONValue>;

/* end of JSON Representation */

/* MAPS */

export type GEO = {
  lat: number;
  lng: number;
};

export type MapCoordinates = {
  type: string;
  coordinates: GEO;
};

export type CoordinatesAsArray = number[];
