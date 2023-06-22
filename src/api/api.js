import axios from "axios";
import {
  CLIENT_KEY,
  SEARCH_IMAGE_API_URL,
  SEARCH_RANDOM_IMAGE_API_URL,
  SEARCH_SIGNLE_IMAGE_API_URL,
  SEARCH_EDITORIAL_FEED_API_URL,
  SEARCH_TOPIC_TAGS_API_URL,
} from "./config";
// import dotenv from "dotenv";
// dotenv.config();
// const {
//   CLIENT_KEY,
//   SEARCH_IMAGE_API_URL,
//   SEARCH_RANDOM_IMAGE_API_URL,
//   SEARCH_SIGNLE_IMAGE_API_URL,
//   SEARCH_EDITORIAL_FEED_API_URL,
//   SEARCH_TOPIC_TAGS_API_URL,
// } = process.env;

//getting photos by search term
const searchImages = async (term, page, order_by) => {
  try {
    const response = await axios.get(SEARCH_IMAGE_API_URL, {
      headers: {
        Authorization: CLIENT_KEY,
      },
      params: {
        query: term,
        per_page: 30,
        page,
        order_by,
      },
    });
    // console.log(response.data.results);
    return response?.data.results;
  } catch (err) {
    console.log(err);
  }
};

//getting random photos
const searchRandomImages = async () => {
  try {
    const response = await axios.get(SEARCH_RANDOM_IMAGE_API_URL, {
      headers: {
        Authorization: CLIENT_KEY,
      },
      params: {
        count: 30,
      },
    });
    // console.log(response.data);
    return response?.data;
  } catch (err) {
    console.log(err);
  }
};

//getting a single photo
const getSingleImage = async (id) => {
  try {
    const response = await axios.get(SEARCH_SIGNLE_IMAGE_API_URL + id, {
      headers: {
        Authorization: CLIENT_KEY,
      },
    });
    // console.log(response.data);
    return response?.data;
  } catch (err) {
    console.log(err);
  }
};

//getting a page from editorial feed
const getEditorialPage = async (order_by) => {
  try {
    const response = await axios.get(SEARCH_EDITORIAL_FEED_API_URL, {
      headers: {
        Authorization: CLIENT_KEY,
      },
      params: {
        page: 1,
        per_page: 30,
        order_by,
      },
    });
    // console.log(response.data);
    return response?.data;
  } catch (err) {
    console.log(err);
  }
};

//getting a new topics
const getNewTopics = async () => {
  try {
    const response = await axios.get(SEARCH_TOPIC_TAGS_API_URL, {
      headers: {
        Authorization: CLIENT_KEY,
      },
      params: {
        per_page: 20,
      },
    });
    // console.log(response.data);
    return response?.data;
  } catch (err) {
    console.log(err);
  }
};

export {
  searchImages,
  searchRandomImages,
  getSingleImage,
  getEditorialPage,
  getNewTopics,
};
