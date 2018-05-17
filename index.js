const request = require('superagent');
const API_HOST = 'http://localhost';
const API_PORT = 8080;
const API_ENDPOINT = `${API_HOST}:${API_PORT}`;

// Fetch provider data
const fetchProviderData = () => {
    return request
        .get(`${API_ENDPOINT}/products/1234`)
        .then((res) => {
            if (res.body.price) {
                return {
                 price:res.body.price
                }
            } else {
                throw new Error('Invalid date format in response')
            }
        }, (err) => {
            throw new Error(`Error from response: ${err.body}`)
        })
};

// fetchProviderData("1234");
module.exports = {
    fetchProviderData
};