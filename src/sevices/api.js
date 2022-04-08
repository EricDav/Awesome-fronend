const axios = require('axios');

export const addPost = async (data) => {
    try {
        const response = await axios.post('/posts', data);
      } catch (error) {
        console.error(error);
      }
}
