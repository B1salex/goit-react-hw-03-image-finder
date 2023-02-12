import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const APY_KEY = '31783345-18b5ac2b353c5eba4d5cdf805';
const FILTER = 'image_type=photo&orientation=horizontal&per_page=12';

export const loadImage = async (searchName, page) => {
    const response = await axios.get(`?q=${searchName}&page=${page}&key=${APY_KEY}&${FILTER}`);
    const images = response.data.hits.map(img => {
        const {id, largeImageURL, webformatURL, tags } = img;
        return {
          id,
          largeImageURL,
          webformatURL,
          tags,
        }})
    return {images, totalHits: response.data.totalHits};
};
