// src/RandomUserService.ts
import axios from 'axios';

const BASE_URL = 'https://randomuser.me/api';

const fetchRandomUser = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data.results[0];
    } catch (error) {
        throw error;
    }
};

export default fetchRandomUser;
