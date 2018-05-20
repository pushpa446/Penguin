const chai = require('chai');
const path = require('path');
const chaiAsPromised = require('chai-as-promised');
const pact = require('pact');
const expect = chai.expect;
const {getProductDetails} = require('./index');
chai.use(chaiAsPromised);
const { somethingLike: like } = pact.Matchers;

const LOG_LEVEL = process.env.LOG_LEVEL || 'WARN';
const PRODUCT_PORT = 9123;

const provider = pact({
    consumer: 'penguin',
    provider: 'product-service',
    port: PRODUCT_PORT,
    log: path.resolve(process.cwd(), 'logs', 'pact.log'),
    dir: path.resolve(process.cwd(), 'pacts'),
    logLevel: LOG_LEVEL,
    spec: 2
});


describe('Product Service', () => {
    before(() => {
        global.PRODUCT_PORT = PRODUCT_PORT;
        return provider.setup()
    });

    describe('Product Details', () => {
        before(() => {
            return provider.addInteraction({
                state: 'HasProduct',
                uponReceiving: 'a request for product data',
                withRequest: {
                    method: 'GET',
                    path: '/products/1234'
                },
                willRespondWith: {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    body: like({
                        id: "1234",
                        name: "Shoe",
                        price: 345.0
                    })
                }
            })
        });

        it('should get product details given a request is made with product id', () => {
            const expectedBody = {
                id: "1234",
                name: "Shoe",
                price: 345.0
            };
            return getProductDetails().then(response => {
                    expect(response).to.deep.equals(expectedBody)
                }
            );
        });

    });

    after(() => {
        provider.verify();
        return provider.finalize()
    })
});