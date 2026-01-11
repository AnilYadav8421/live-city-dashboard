import api from "./api";


const NEWS_BASE_URL = "https://gnews.io/api/v4";


export const getTopNews = async () => {
    const response = await api.get(`${NEWS_BASE_URL}/top-headlines`, {
        params: {
            token: import.meta.env.VITE_NEWS_API_KEY,
            lang: "en",
            max: 5,
        },
    });


    return response.data.articles;
};