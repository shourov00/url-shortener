import {axios, base_url} from "../api";

const qs = require('qs');

const postUrl = async (data) => {
    return await axios.post(`${base_url}/url`, qs.stringify(data));
}

const getUrl = async (slug) => {
    return await axios.get(`${base_url}/url/${slug}`);
}

export default {
    postUrl,
    getUrl
}
