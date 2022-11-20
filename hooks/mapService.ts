//api.mapbox.com/{api_service}/{version}

import axios from "axios";
import { MapCoordinates } from "../models/utils";

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
  const { lat, lng } = point.coordinates;
  return `POINT(${lng} ${lat})`;
};

export const getResultsFromSearch = async (address: string) => {
  try {
    const { data } = await axios.get(
      `https://api.mapbox.com/${GEOCODING_API}/${MAPBOX_VERSION}/mapbox.places/${address}.json?country=pt&types=address&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESSTOKEN}`
    );
    return { data: data.features, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const giveSearchByLocationSearch = async (text: string) => {
  try {
    const { data } = await axios.get(
      `https://api.mapbox.com/${GEOCODING_API}/${MAPBOX_VERSION}/mapbox.places/${text}.json?country=pt&types=place&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESSTOKEN}`
    );
    return { data: data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};
