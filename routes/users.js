const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require('bcryptjs');
const User = require("../models/user");

const router = express.Router();
router.use(bodyParser.json());

/*
    Find users
*/

router.get("/", (req, res) => {
    
    User.find()
    .then(players => res.status(200).json(players))
    .catch(error => res.status(400).json({message: error}))
})

/*
    Register new user
*/

router.post("/register", (req, res) => {
    
    const { username, password } = req.body
    
    const user = new User({     
        username,
        password: bcrypt.hashSync(password, 10)     
    })
    
    user.save()
    .then(() => res.status(200).json({message: "New user created"}))
    .catch(error => res.status(400).json({message: error}))
})

/*
    Login user
*/

router.post("/login", async (req, res) => {

    const { username, password } = req.body

    const existingUser = await User.findOne({ username: username })

    if(!existingUser) {
        return res.status(400).json({message: "User not found!"})
    }

    bcrypt.compare(password, existingUser.password, (error, result) => {
        if(result) {
            return res.status(400).json({message: "Successfully login"})

        }
        else {
            return res.json({message: "Wrong password!"})
        }
    })

})

/*
    Delete user
*/

router.delete("/:id", (req, res) => {
    User.findByIdAndDelete(req.params.id, (error, result) => {
        if(result) {
            return res.status(200).json({message: "User deleted"})
        }      
        else {
            return res.status(400).json({message: error})
        }
    })
})

module.exports = router;