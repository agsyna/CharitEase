const Fields = require('./../models/registermodel')

const registerUser = async (req, res) => {
    const { fname, lname, email, governmentid, dob,type,password } = req.body;

    const newUser = await Fields.create({
        fname,
        lname,
        email,
        governmentid,
        dob,
        type,
        password,
    });

    res.status(201).json({
        status: 'success',
        message: 'User registered successfully',
        user: newUser,
    });
};


const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                status: 'fail',
                message: 'Please provide both email and password',
            });
        }

        const user = await Fields.findOne({ email });

        if (!user || user.password !== password) {
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid email or password',
            });
        }

        user.password = undefined;

        res.status(200).json({
            status: 'success',
            message: 'You are logged in',
            user: user, 
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: 'Login failed',
            error: error.message,
        });
    }
};


module.exports = { login,registerUser};
