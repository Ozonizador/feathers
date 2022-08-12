/* JSON Representation */
export type JSONValue = string | number | boolean | JSONObject | JSONArray;

interface JSONObject {
  [x: string]: JSONValue;
}

type JSONArray = Array<JSONValue>;

/* end of JSON Representation */

/* MAPS */

export interface MapCoordinates {
  latitude: number;
  longitude: number;
}
