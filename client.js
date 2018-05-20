const consumer = require('./index');

consumer.getProductDetails().then(response => {
        console.log(response);
    }, error => {
        console.log(error)
    }
);