const express = require('express');

const app = express();

const PORT = 3001;

//take care of CORS related issues
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});



app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})