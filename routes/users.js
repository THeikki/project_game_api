const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
require('dotenv').config();
const User = require("../models/user");
const cAuth = require('../middlewares/checkAuth');
const router = express.Router();
router.use(bodyParser.json());

/*
    Find users
*/

router.get("/", async (req, res) => {
    await User.find()
    .then(users => res.status(200).json(users))
    .catch(error => res.status(400).json({message: error}))
})

/*
    Find single user by id
*/

router.get("/:id", cAuth.checkAuth, async (req, res) => {
    await User.findById({ _id: req.params.id })
    .then(user => res.status(200).json(user))
    .catch(error => res.status(400).json({message: error}))

})

/*
    Register new user
*/

router.post("/register", async (req, res) => {
    const { username, password, gameTimes, highScore, overallPoints } = req.body
    const hashedPassword = bcrypt.hashSync(password, 10)
    const existingUser = await User.findOne({ username: username })
    
    if(existingUser) {
        return res.json({message: "User name already taken"})
    }

    const user = new User({     
        username,
        password: hashedPassword, 
        gameTimes,
        highScore,
        overallPoints    
    }) 
    if(password) {
        user.save()
        .then(() => res.status(200).json({message: "New user created"}))
        .catch(error => res.status(400).json({message: error}))
    }
    else {
        return res.status(400).json({message: "Please give password"})
    }

     
    
})

/*
    Login user
*/

router.post("/login", async (req, res) => {
    const { username, password } = req.body
    const existingUser = await User.findOne({ username: username })

    if(!existingUser) {
        return res.json({message: "User not found!"})
    }

    bcrypt.compare(password, existingUser.password, (error, result) => {
        if(result) {
            const token = jwt.sign(
                { username: result.username },
                process.env.JWT_TOKEN,
                {
                  expiresIn: "10min",
                }
              )          
            return res.status(200).json({
                token: token,
                id: existingUser._id
            })  
        }
        else {
            return res.json({message: "Wrong password!"})
        }
    })
})

/*
    Update User statistics
*/

router.put("/update/:id", cAuth.checkAuth, async (req, res) => {
    var { gameTimes, highScore, overallPoints } = req.body
    
    await User.findByIdAndUpdate({_id: req.params.id}, req.body)
        .then(user => {
            gameTimes = gameTimes,
            highScore = highScore,
            overallPoints = overallPoints
    
            user.save()
            .then(() => res.status(200).json({message: "User stats updated"}))
            .catch(error => res.status(400).json({message: error}))
        })
        .catch(() => res.status(500).json({message: "Not found"}))    
})

/*
    Delete user
*/

router.delete("/:id", cAuth.checkAuth, (req, res) => {
    User.findByIdAndDelete(req.params.id, (error, result) => {
        if(result) {
            return res.status(200).json({message: "User deleted"})
        }      
        else {
            return res.status(400).json({message: error})
        }
    })
})

module.exports = router