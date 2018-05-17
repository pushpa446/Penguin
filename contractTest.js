const chai = require('chai');
const path = require('path');
const chaiAsPromised = require('chai-as-promised');
const pact = require('pact');
const expect = chai.expect;
const API_PORT = 9123;
const {fetchProviderData} = require('./index');
chai.use(chaiAsPromised);

const LOG_LEVEL = process.env.LOG_LEVEL || 'WARN';

const provider = pact({
    consumer: 'penguin',
    provider: 'ProductService',
    port: API_PORT,
    log: path.resolve(process.cwd(), 'logs', 'pact.log'),
    dir: path.resolve(process.cwd(), 'pacts'),
    logLevel: LOG_LEVEL,
    spec: 2
});


describe('Pact with Our Provider', () => {

    before(() => {
        return provider.setup()
    });
    describe('should return with product details', () => {
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
                    body: {
                        price: 345
                    }
                }
            })
        });

        it('can process the JSON payload from the provider', () => {
            var expectedBody = {
                price: 345
            };
            fetchProviderData().then(response => {
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