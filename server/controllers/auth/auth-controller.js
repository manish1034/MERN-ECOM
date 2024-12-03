const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");


// register
const register = async (req, res) => {
    const { userName, email, password } = req.body;

    try {
        const checkUser = await User.findOne({ email });
        if(checkUser) {
            return res.json({
                success: false,
                message: "User already exists",
            });
        }
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
        const checkUser = await User.findOne({ email });
        if(!checkUser) {
            return res.json({
                success: false,
                message: "User not found",
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, checkUser.password);
        if(!isPasswordMatch) {
            return res.json({
                success: false,
                message: "Invalid password",
            });
        }
        const token = jwt.sign({ id: checkUser._id, role: checkUser.role, email: checkUser.email }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 1000,
        });

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: checkUser._id,
                role: checkUser.role,
                email: checkUser.email,
            }
        });
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
