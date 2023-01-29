const User = require("../models/user.model");


signupMiddleware = async (req,res,next) =>{
  // validate if the name is already exist
  if (!req.body.name) {
    console.log(res)
    return res.status(400).send('Name is not provided')
  }

  //Validate if the userId exists
  if (!req.params['username']) {
    return res.status(400).send('UserID is not provided')
  }

  /**
   * Valiate if the userID is already not preset
   */
  const user = await User.findOne({ userID: req.params['username'] })
  if (user != null) {
    return res.status(400).send('UserID already exists')
  }

  if (!req.body.email) {
    return res.status(400).send('User Email is Not provided')
  }

  /**
   * Valiate if the u is already not preset
   */
  const email = await User.findOne({ email: req.body.email })
  // message : "Failed !  Email already exist"
  if (email != null) {
    return res.status(400).send('Email Already Exists')
  }

  if (!req.body.password) {
    return res.status(400).send('Password is not provided')
  }

  next() // give the controll to the controller
}

 
 module.exports = {
   signupMiddleware,
 }