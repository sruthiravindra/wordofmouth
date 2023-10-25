import axios from 'axios';
import { baseUrl } from '../app/shared/baseUrl';

const getToken = () => {
    return localStorage.getItem('token')
}

const get = async (path) => {
    try {
        const token = getToken()
        const request_url = baseUrl + path;
        const request_header = {
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            }
        }
        const response = await axios.get(request_url, request_header);
        return response;
    } catch (err) {
        console.error(err);
        throw new Error(err.message);
    }
}

const post = async (path, data) => {
    try {
        const token = getToken()
        const request_url = baseUrl + path;
        const request_header = {
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            }
        }
        const response = await axios.post(request_url, JSON.stringify(data), request_header);
        return response;
    } catch (err) {
        console.error(err);
        throw new Error(err.message);
    }
}

const put = async (path, data) => {
    try {
        const token = getToken()
        const request_url = baseUrl + path;
        const request_header = {
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            }
        }
        const response = await axios.put(request_url, JSON.stringify(data), request_header);
        return response;
    } catch (err) {
        console.error(err);
        throw new Error(err.message);
    }
}

export const axiosGet = get;
export const axiosPost = post;
export const axiosPut = put;