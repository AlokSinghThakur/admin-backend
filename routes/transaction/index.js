const express = require('express');
const ROUTE = express.Router();
const authorize = require('../../services/middleware');
const roles = require('../../services/roles');
const transactionController = require('../../controllers/transaction')

ROUTE.post('/create-transaction',authorize([roles.User]),transactionController.createTransaction)
ROUTE.get('/get-transaction-by-userid',authorize([roles.User,roles.Support]),transactionController.getTransactionByUserId)
ROUTE.post('/delete-transaction',authorize([roles.User]),transactionController.deleteTransactionById)



module.exports = ROUTE
