const express = require('express');
const app = express();

app.use(express.json());

const models = require('./models');

const USER_ROUTES = require('./routes/users')
const TRANSACTION_ROUTES = require('./routes/transaction')

app.use('/user', USER_ROUTES);
app.use('/transaction', TRANSACTION_ROUTES)


models.db_config
    .sync({
        //    force: true,
        // alter: true,
    })
    .then(() => {
        console.log(`Connected to Database!`);
    })
    .catch(err => {
        console.log('Could not connect to the database. Exiting now...', err)
        process.exit()
    });


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})
