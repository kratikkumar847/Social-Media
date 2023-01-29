const express = require("express");
const router = express.Router();

router.get('/', (req,res) =>{
    res.status(201).send({
        message : "Welcome to social media backend..."
    })
})

module.exports = router