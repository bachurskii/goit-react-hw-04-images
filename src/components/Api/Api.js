import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '37252560-36dec1b2157d7a37d8f4686c6';

const GetImages = async (searchQuery, page) => {
  try {
    const respone = await axios.get(
      `${BASE_URL}?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );
    return respone.data.hits;
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
};

export default GetImages;
