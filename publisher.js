const pact = require('@pact-foundation/pact-node');

const opts = {
    pactFilesOrDirs: [`${__dirname}/pacts`],
    pactBroker: 'http://localhost:8888/',
    consumerVersion: '1.0.0'
};

pact.publishPacts(opts)
    .then(() => {})
    .catch(e => {
        console.error('Pact contract publishing failed: ', e);
        process.exit(1);
    });

