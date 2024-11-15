const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");


// register
const register = async (req, res) => {
    const { userName, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 12);

        // const newUser = new User({ userName, email, password: hashedPassword });

        // await newUser.save();
        const newUser = await User.create({ userName, email, password: hashedPassword });
        res.status(201).json({
            success: true,
            message: "User created successfully",
            newUser,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            success: false,
            message: "Something went wrong",
         });
    }
 }


// login
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            success: false,
            message: "Something went wrong",
         });
    }
}


// logout

// auth middleware



module.exports = { register, login };
