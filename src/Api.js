
import axios from "axios";

const api = axios.create({
  baseURL: "https://wft-geo-db.p.rapidapi.com/v1/geo",
  headers: {
    "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
    "x-rapidapi-key": "4ac5e3352fmshe6ac515ca3b8ccap1f0045jsnf0a504a87bbe",
  },
});

export const fetchCities = async ({ countryIds, namePrefix, offset, limit }) => {
  try {
    const response = await api.get("/cities", {
      params: {
        countryIds,
        namePrefix,
        offset,
        limit,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
