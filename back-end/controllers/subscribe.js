const sbr = require('../models/subscribe')
const SubscribeUser = async (req, res) => {
    const {email} = req.body;

    const newUser = await sbr.create({
        email
        
    });

    res.status(201).json({
        status: 'success',
        message: 'User subscribed successfully',
        user: newUser,
    });
};

module.exports = SubscribeUser;