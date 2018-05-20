const chai = require('chai');
const path = require('path');
const chaiAsPromised = require('chai-as-promised');
const pact = require('pact');
const expect = chai.expect;
const {getProductList} = require('./index');
chai.use(chaiAsPromised);
const {somethingLike: like} = pact.Matchers;

const LOG_LEVEL = process.env.LOG_LEVEL || 'WARN';
const CATEGORY_PORT = 9124;

const provider = pact({
    consumer: 'penguin',
    provider: 'category-service',
    port: CATEGORY_PORT,
    log: path.resolve(process.cwd(), 'logs', 'pact.log'),
    dir: path.resolve(process.cwd(), 'pacts'),
    logLevel: LOG_LEVEL,
    spec: 2
});


describe('Category Service', () => {
    before(() => {
        global.CATEGORY_PORT = CATEGORY_PORT;
        return provider.setup()
    });

    describe('Product Lists', () => {
        before(() => {
            return provider.addInteraction({
                state: 'HasProductList',
                uponReceiving: 'a request for productList',
                withRequest: {
                    method: 'GET',
                    path: '/category/12345'
                },
                willRespondWith: {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    body: like({
                        id: '12345',
                        products:
                            [{id: '1234', name: 'Table', price: 450},
                                {id: '4567', name: 'Table', price: 450},
                                {id: '891', name: 'Table', price: 450}]
                    })
                }
            })
        });

        it('should get productList given a request is made with category id', () => {
            const expectedBody = {
                id: '12345',
                products:
                    [{id: '1234', name: 'Table', price: 450},
                        {id: '4567', name: 'Table', price: 450},
                        {id: '891', name: 'Table', price: 450}]
            };
            return getProductList().then(response => {
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