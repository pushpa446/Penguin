const request = require('superagent');
global.API_HOST = 'http://localhost';
global.PRODUCT_PORT = 8080;
global.CATEGORY_PORT = 8090;

// Fetch provider(ProductService) data for single product
const getProductDetails = () => {
    const PRODUCT_API_ENDPOINT = `${global.API_HOST}:${global.PRODUCT_PORT}`;
    return request
        .get(`${PRODUCT_API_ENDPOINT}/products/1234`)
        .then((res) => {
            if (res.body.price) {
                return res.body;
            } else {
                throw new Error('Invalid productDetails format in response')
            }
        }, (err) => {
            throw new Error(`Error from response: ${err.body}`)
        })
};

//Fetch productList
const getProductList = () => {
    const CATEGORY_API_ENDPOINT = `${global.API_HOST}:${global.CATEGORY_PORT}`;
    return request
        .get(`${CATEGORY_API_ENDPOINT}/category/12345`)
        .then((res) => {
            if (res.body) {
                return res.body;
            } else {
                throw new Error('Invalid productList format in response')
            }
        }, (err) => {
            throw new Error(`Error from response: ${err.body}`)
        })
};

module.exports = {
    getProductDetails: getProductDetails,
    getProductList: getProductList
};