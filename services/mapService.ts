//api.mapbox.com/{api_service}/{version}

import axios from "axios";

const GEOCODING_API = "geocoding";
const MAPBOX_VERSION = "v5";

export const getCoordinatesFromSearch = async (address: string) => {
  try {
    const { data } = await axios.get(
      `https://api.mapbox.com/${GEOCODING_API}/${MAPBOX_VERSION}/mapbox.places/${address}.json?types=address&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESSTOKEN}`
    );
    if (data && data.features && data.features.length > 0) {
      const feature = data.features[0];
      const longitude = feature.center[0];
      const latitude = feature.center[1];
      return { longitude, latitude };
    } else {
      return { longitude: null, latitude: null };
    }
  } catch (error) {
    return { data: null, error };
  }
};
