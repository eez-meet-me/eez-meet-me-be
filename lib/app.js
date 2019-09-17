const express = require('express');
const app = express();

app.use(require('cors')());

app.use(express.json());

app.use('/api/v1/pins', require('./routes/pins'));
app.use('/api/v1/users', require('./routes/users'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
