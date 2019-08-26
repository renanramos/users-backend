const express = require('express');
const appUserController = express();
const userRoute = require('./../router/user.router');

appUserController.get(userRoute.get);
appUserController.post(userRoute.post);
appUserController.patch(userRoute.patch);
appUserController.delete(userRoute.delete);

module.exports = appUserController;
