import axios from "axios";

export const getAllCountries = async () => {
    const response = await axios.get(
        "https://restcountries.com/v3.1/all?fields=name,flags,region,population,cca3"
    );
    return response.data;
};
