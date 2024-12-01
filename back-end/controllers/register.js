const Fields = require('./../models/registermodel')

const registerUser = async (req, res) => {
    const { fname, lname, email, governmentid, dob,type,password } = req.body;

    // Create a new user
    const newUser = await Fields.create({
        fname,
        lname,
        email,
        governmentid,
        dob,
        type,
        password,
    });

    // Respond with a success message
    res.status(201).json({
        status: 'success',
        message: 'User registered successfully',
        user: newUser,
    });
};


const login = async (req, res, next) => {
    const { email, password } = req.body;

    // Check if both email and password are provided
    if (!email || !password) {
        return res.status(400).json({
            status: 'fail',
            message: 'Please provide both email and password',
        });
    }

    // Find user by email
    const user = await Fields.findOne({ email });

    // If user does not exist or password does not match
    if (!user || user.password !== password) {
        return res.status(400).json({
            status: 'fail',
            message: 'Invalid email or password',
        });
    }

    // Hide password from the response
    user.password = undefined;

    // Respond with a success message
    res.status(200).json({
        status: 'success',
        message: 'You are logged in',
        user: user, // Optionally, return user data without password
    });
};

module.exports = { login,registerUser};
