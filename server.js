const express = require('express');
const app = express();

app.use(express.static(__dirname + ''));

console.log(`Server started at ${process.env.PORT || 8080}`);
app.listen(process.env.PORT || 8080);

