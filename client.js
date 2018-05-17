const consumer = require('./index');

consumer.fetchProviderData().then(response => {
        console.log(response);
    }, error => {
        console.log(error)
    }
);