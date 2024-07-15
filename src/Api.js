import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com';

export const getPosts = async () => {
  try {
    const response = await axios.get(`${API_URL}/posts`);
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const getPostById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching post with id ${id}:`, error);
    throw error;
  }
};

export const createPost = async (post) => {
  try {
    const response = await axios.post(`${API_URL}/posts`, post);
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

export const updatePost = async (id, post) => {
  try {
    const response = await axios.put(`${API_URL}/posts/${id}`, post);
    return response.data;
  } catch (error) {
    console.error(`Error updating post with id ${id}:`, error);
    throw error;
  }
};

export const deletePost = async (id) => {
  try {
    await axios.delete(`${API_URL}/posts/${id}`);
  } catch (error) {
    console.error(`Error deleting post with id ${id}:`, error);
    throw error;
  }
};
