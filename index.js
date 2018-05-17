const request = require('superagent');
global.API_HOST = 'http://localhost';
global.API_PORT = 8080;

// Fetch provider data
const fetchProviderData = () => {
    const API_ENDPOINT = `${global.API_HOST}:${global.API_PORT}`;
    return request
        .get(`${API_ENDPOINT}/products/1234`)
        .then((res) => {
            if (res.body.price) {
                return res.body;
            } else {
                throw new Error('Invalid date format in response')
            }
        }, (err) => {
            throw new Error(`Error from response: ${err.body}`)
        })
};

module.exports = {
    fetchProviderData
};