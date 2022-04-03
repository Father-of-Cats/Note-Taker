const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

// MID AF Ware
app.use(express.json());


app.listen(PORT, () => {
    console.log('Listening baby')
});