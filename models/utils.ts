/* JSON Representation */
export type JSONValue = string | number | boolean | JSONObject | JSONArray;

interface JSONObject {
  [x: string]: JSONValue;
}

type JSONArray = Array<JSONValue>;

/* end of JSON Representation */

/* MAPS */

export type Coordinates = number[] | null;
export type GEO = {
  latitude: number;
  longitude: number;
};

export type MapCoordinates = {
  type: string;
  coordinates: Coordinates;
};
