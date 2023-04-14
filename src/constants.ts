// extIds
// find ids using the stop lookup endpoint https://www.trafiklab.se/api/trafiklab-apis/resrobot-v21/stop-lookup/
const DUVBO = "740021673";
const CITY_SUBWAY = "740098000";

export const CITY_SUBWAY_TO_DUVBO = `https://api.resrobot.se/v2.1/trip?format=json&originId=${CITY_SUBWAY}&destId=${DUVBO}&passlist=true&showPassingPoints=true&accessId=${
  import.meta.env.VITE_API_KEY
}`;
export const DUVBO_TO_CITY_SUBWAY = `https://api.resrobot.se/v2.1/trip?format=json&originId=${DUVBO}&destId=${CITY_SUBWAY}&passlist=true&showPassingPoints=true&accessId=${
  import.meta.env.VITE_API_KEY
}`;
