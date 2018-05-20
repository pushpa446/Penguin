// const chai = require('chai');
// const path = require('path');
// const chaiAsPromised = require('chai-as-promised');
// const pact = require('pact');
// const expect = chai.expect;
// const {getProductList} = require('./index');
// chai.use(chaiAsPromised);
// const {somethingLike: like} = pact.Matchers;
//
// const LOG_LEVEL = process.env.LOG_LEVEL || 'WARN';
// const CATEGORY_PORT = 9124;
//
// const provider = pact({
//     consumer: 'penguin',
//     provider: 'category-service',
//     port: CATEGORY_PORT,
//     log: path.resolve(process.cwd(), 'logs', 'pact.log'),
//     dir: path.resolve(process.cwd(), 'pacts'),
//     logLevel: LOG_LEVEL,
//     spec: 2
// });
//
//
// describe('Category Service', () => {
//     before(() => {
//         global.CATEGORY_PORT = CATEGORY_PORT;
//         return provider.setup()
//     });
//
//     describe('Product Lists', () => {
//         //add a interaction to get productList
//         before(() => {
//             return provider.addInteraction()
//         });
//
//         it('should get productList given a request is made with category id', () => {
//             //modify here to add expected response
//             const expectedBody = {};
//             return getProductList().then(response => {
//                     expect(response).to.deep.equals(expectedBody)
//                 }
//             );
//         });
//
//     });
//
//     after(() => {
//         provider.verify();
//         return provider.finalize()
//     })
// });