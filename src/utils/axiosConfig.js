import axios from 'axios';

const baseURL = "https://us-central1-wordofmouth-alpha.cloudfunctions.net/api"
const token = ""

const get = async (path) => {
    try {
        const request_url = baseURL + path;
        const request_header = {
            headers: {
                // "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        }
        const response = await axios.get(request_url, request_header);
        console.log(`axios get response: ${response}`)
        return response.data;
    } catch (err) {
        console.error(err);
    }
}

const post = async (path, data) => {
    try {
        const request_url = baseURL + path;
        const request_header = {
            headers: {
                // "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            }
        }
        const response = await axios.post(request_url, JSON.stringify(data), request_header);
        return response.data;
    } catch (err) {
        console.error(err);
    }
}

export const axiosGet = get;
export const axiosPost = post;