const mongoose = require('mongoose')
require('dotenv').config();

mongoose.connect(process.env.MONGODB, { useNewUrlParser: true , useUnifiedTopology: true })
    .then(console.log("CONNECTED"))
    .catch((error) => console.log(error))