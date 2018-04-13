import axios from 'axios';
import config from '../app.config.json';
import {getData} from '../storage/browserStorage'

const regexpTemplate = '^(http|https)://';
const host = config.server.host;

class Request {
    

    static async get(url, options) {  
        let requestOptions = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getData('token')}`
            }
        };

        if(options) {
            if(options.headers) {
                Object.keys(options.headers).map(header => {
                    requestOptions.headers[header] = options.headers[header];
                    return requestOptions.headers[header];
                });
            }
        }

        url = url.search(regexpTemplate) === -1 ? host + url : url;
        let response = await axios.get(url, requestOptions);
        if(response.status >= 200 && response.status < 300) return response.data;
        if(response.status === 404) throw new Error("Service not found or unavailible.")
        throw new Error("Request error was thrown.")
    }

    static async post(url, data) {
        let requestOptions = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getData('token')}`
            }
        };
        url = url.search(regexpTemplate) === -1 ? host + url : url;
        let response = await axios.post(url, data, requestOptions);
        if(response.status >= 200 && response.status < 300) return response.data;
        if(response.status === 404) throw new Error("Service not found or unavailible.")
        throw new Error("Request error was thrown.")
    }

    static async put(url, data) {
        let requestOptions = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getData('token')}`
            }
        };
        url = url.search(regexpTemplate) === -1 ? host + url : url;
        let response = await axios.put(url, data, requestOptions);
        if(response.status >= 200 && response.status < 300) return response.data;
        if(response.status === 404) throw new Error("Service not found or unavailible.")
        throw new Error("Request error was thrown.")
    }

    static async delete(url) {
        let requestOptions = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getData('token')}`
            }
        };
        url = url.search(regexpTemplate) === -1 ? host + url : url;
        let response = await axios.delete(url, requestOptions);
        if(response.status >= 200 && response.status < 300) return response.data;
        if(response.status === 404) throw new Error("Service not found or unavailible.")
        throw new Error("Request error was thrown.")
    }

    static async login(login, password) {
        const toFormBody = (params) => {
            var formBody = [];
            for (var property in params) {
                var encodedKey = encodeURIComponent(property);
                var encodedValue = encodeURIComponent(params[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
            return formBody;
        }

        let requestOptions = {
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/x-www-form-urlencoded'
            }
        };

        let data = toFormBody({
            username: login,
            password: password,
            grant_type: 'password',
            client_id: config.server.clientId
        });

        var response = await axios.post(config.server.host + config.server.auth, data, requestOptions);

        return response.data;
    }
}

export default Request;