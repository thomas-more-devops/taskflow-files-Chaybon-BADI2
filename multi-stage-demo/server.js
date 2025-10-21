const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('<h1>Multi-stage build geslaagd!</h1>');
});

app.listen(3000, () => console.log('Server op poort 3000'));