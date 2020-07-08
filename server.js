require('custom-env').env();
const express = require('express');
const bodyParser = require('body-parser');
const postsRoutes = require('./routes/posts');
const authRoutes = require('./routes/auth');
const mongoose = require('mongoose');

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('database connection successful'))
    .catch(err => console.log('Database connection error: ' + err));

const app = express();

const port = process.env.SERVER_PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require("./config/passport");

app.use('/api', authRoutes);
app.use('/api/post', postsRoutes);

app.listen(port, () => {
    console.log('server running on port ' + port);
});
