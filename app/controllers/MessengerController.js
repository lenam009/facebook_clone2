var jwt = require('jsonwebtoken');
const Messenger = require('../models/Messenger');

async function getOneUserById(_id) {
    const userCurrent = await User.findById(_id).catch(() => null);
    return userCurrent;
}

class MessengerController {
    create(req, res, next) {
        const currentUser = req.user;

        Messenger.create({ senderId: currentUser._id, ...req.body })
            .then((response) => {
                var date = new Date(response._doc.createdAt);
                console.log('timeTest', new Date(response._doc.createdAt).toUTCString());
                console.log(
                    'timeTest2',
                    new Date(
                        date.valueOf() + date.getTimezoneOffset() * 70000,
                    ).toUTCString(),
                );

                console.log('timeTest3', date.toString());

                return res.status(201).json({
                    statusCode: 201,
                    message: 'Create a messenger successfully',
                    data: {
                        ...response._doc,
                    },
                });
            })
            .catch(() =>
                next({
                    statusCode: 500,
                    message: 'Create messenger failed',
                    error: 'Create messenger failed',
                }),
            );
    }

    async getAllMessengerBySenderAndReceiver(req, res, next) {
        const currentUser = req.user;

        Messenger.find({
            $and: [
                { senderId: { $in: [currentUser._id, req.params.receiverId] } },
                { receiverId: { $in: [currentUser._id, req.params.receiverId] } },
            ],
        })
            .sort({ createdAt: 'desc' })
            .then((response) => {
                return res.status(200).json({
                    statusCode: 200,
                    message: 'Get messenger successfully',
                    data: response,
                });
            })
            .catch(() =>
                next({
                    statusCode: 500,
                    message: 'Get messenger failed',
                    error: 'Get messenger failed',
                }),
            );
    }
}

module.exports = new MessengerController();
