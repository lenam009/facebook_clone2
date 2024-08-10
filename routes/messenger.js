const express = require('express');
const router = express.Router();

const MessengerController = require('../app/controllers/MessengerController');
const authenticationMiddleware = require('../app/middlewares/authentication');

router.get(
    '/:receiverId',
    authenticationMiddleware.checkToken,
    MessengerController.getAllMessengerBySenderAndReceiver,
);

router.post('/', authenticationMiddleware.checkToken, MessengerController.create);

router.use((err, req, res, next) => {
    const statusCode = err.statusCode ?? 500;
    res.status(statusCode).json({ service: 'MESSENGER_Api', ...err });
});

module.exports = router;
