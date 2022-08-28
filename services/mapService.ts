//api.mapbox.com/{api_service}/{version}

import axios from "axios";
import { GiConsoleController } from "react-icons/gi";
import { Coordinates, MapCoordinates } from "../models/utils";

const GEOCODING_API = "geocoding";
const MAPBOX_VERSION = "v5";

export const getCoordinatesFromSearch = async (address: string) => {
  try {
    const { data } = await axios.get(
      `https://api.mapbox.com/${GEOCODING_API}/${MAPBOX_VERSION}/mapbox.places/${address}.json?types=address&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESSTOKEN}`
    );
    if (data && data.features && data.features.length > 0) {
      const feature = data.features[0];
      const geometry = feature.geometry;
      return { geometry };
    } else {
      return { geometry: null };
    }
  } catch (error) {
    return { geometry: null, error };
  }
};

export const createPointForDatabase = (point: MapCoordinates) => {
  const { latitude, longitude } = getCoordsFromPoint(point.coordinates);
  return `POINT(${longitude} ${latitude})`;
};

export const getCoordsFromPoint = (coordinates: Coordinates) => {
  if (coordinates) {
    return { latitude: coordinates[1], longitude: coordinates[0] };
  } else {
    return { latitude: null, longitude: null };
  }
};

export const getResultsFromSearch = async (address: string) => {
  try {
    const { data } = await axios.get(
      `https://api.mapbox.com/${GEOCODING_API}/${MAPBOX_VERSION}/mapbox.places/${address}.json?types=address&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESSTOKEN}`
    );
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};
