import axios from 'axios';

export const fetchSearchResults = async (query, page) => {
  try {
    const response = await axios.get(`http://hn.algolia.com/api/v1/search?query=${query}&page=${page}`);
    return response.data.hits;
  } catch (error) {
    throw new Error('Error fetching search results');
  }
};

export const fetchPostDetails = async (postId) => {
  try {
    const response = await axios.get(`http://hn.algolia.com/api/v1/items/${postId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching post details');
  }
};