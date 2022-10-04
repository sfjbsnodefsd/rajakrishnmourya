const { creatUser, creatUserTable } = require('./user.controller');

const user_router = require('express').Router();


user_router.get('/add-user', creatUser);
user_router.post('/create-user-table', creatUserTable);


module.exports = user_router;