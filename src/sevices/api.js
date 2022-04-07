const axios = require('axios');

export const addPost = async (data) => {
    try {
        const response = await axios.post('/posts', data);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
}
