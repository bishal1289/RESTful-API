const User = require("../db/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const loginController = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ email: email })
        const hashedPassword = await bcrypt.compare(password, user.password);
        
        if (user.email == email && hashedPassword == true) {
            const token = await jwt.sign(email, ACCESS_TOKEN)
            console.log(token);
            res.status(200).json({ message: "User logged in successfully" ,  token: token });
        } else {
            res.status(404).json({message:"Invalid email or password"})
        }
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

const registerController = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const existUser = await User.findOne({ email: email });
        if (existUser) {
            res.status(500).send({ message: "User already Exists" });
        }
        else {
            const hashedPassword = bcrypt.hashSync(password, 10);
            await User.create({ email: email, password: hashedPassword })
              .then(() => {
                console.log("User created");
              })
              .catch((err) => {
                console.log(err);
              });
        }
    } catch (err) {
        console.log(err);
    }
}

const allUsersController = async (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
    console.log(token)
    
    try {
        const verifyToken = await jwt.verify(token, ACCESS_TOKEN);
        if (verifyToken) {
            let user = await User.find({})
            console.log(user)
            res.status(200).send({ Users: user })
        }
        else {
            res.status(403).send({message:"Unauthorized Access"})
        }
    } catch (error) {
        res.status(500).send({ Error: error });
    }
    
}

const getLoginController = async (req, res) => { 
    res.render("login");
}
module.exports = { loginController, registerController, allUsersController,getLoginController };