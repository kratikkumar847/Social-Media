const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();


// signup controller for the user 
exports.signup = async (req,res) =>{
    const userData = {
      name: req.body.name,
      username: req.params['username'],
      password: bcrypt.hashSync(req.body.password, 8),
      gender: req.body.gender,
      email: req.body.email
    }
    // create new user and store in the database
    try {
        
        const createdUser = new User(userData);
        createdUser.save();
        const responseOFNewUser = {
          name: createdUser.name,
          username: createdUser.username,
          password: createdUser.password,
          gender: createdUser.gender,
          email: createdUser.email,
        }
         
        console.log(createdUser);
        console.log(responseOFNewUser);


        // return res.status(201).send({
        //   success: true
        // })

        return res.status(201).send({
          success: true,
          status: 201,
          message: `${createdUser.name}, Added Succesfully !!`,
          user: responseOFNewUser
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({
          success: false,
          message: error.massage,
        })
    }
}

// signin controller for the user
exports.signin = async (req, res) => {
  //Search the user if it exists
  try {
    var user = await User.findOne({ username: req.body.username })
  } catch (err) {
    console.log(err.message)
  }

  if (user == null) {
    return res.status(400).send("User ID Doesn't Exist !")
  }

  //User is exists , check for the valid password
  const isPasswordValid = bcrypt.compareSync(req.body.password, user.password)

  if (!isPasswordValid) {
    return res.status(401).send('Invalid Password')
  }

  //** Successfull login */
  //need to generate access token now
  const token = jwt.sign({ id: user.username }, process.env.SECRET, {
    expiresIn: '2h',
  })
  console.log(user.username)
  //Send the response back
  return res.status(200).send({
    success: true,
    status: 200,
    message: `${user.username} login Successfully !`,
    user: {
      name: user.name,
      userID: user.userID,
      email: user.email,
      accessToken: token,
    },
  })
}


// controller for geting details of all the user
exports.getAllUser = async (req, res) =>{
    try {
      const user = await User.find();

      return  res.status(200).send({
      success: true,
      message: `${user.username} , Fetched the user !`,
      users: user,
    })

      
    } catch (error) {
      console.log(error)
      res.status(500).send({
        success: false,
        message: `Internal Server Error , while Fetching user By ID  `,
      })
    }
}


// controller for geting details of specific user
exports.getUserByID = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params['username'] })

    if (!user) {
      return res.status(200).send({
        success: true,
        message: `No user Found with userID : ${user.username}`,
      })
    }

    return res.status(200).send({
      success: true,
      message: `${user.username} , Fetched the user !`,
      user: user,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: `Internal Server Error , while Fetching user By ID  `,
    })
  }
}


// controller for follow a specific user 
exports.followAUser = async (req, res) =>{
  try {
    const user = await User.findOne({ username: req.params['username'] });
    const followingUser = await User.findOne({ username: req.params['follow'] });
    user['following'].push(followingUser.username) ;
    followingUser['followers'].push(user.username) ;
    await user.save();
    await followingUser.save();

    return res.status(201).send({
      success : true,
      massage: `${user.username} is following to the user : ${followingUser.username}`
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: `Internal Server Error , while Fetching user By ID  `,
    })
    
  }


}


// controller for unfollow a specific user 
exports.unfollowAUser = async (req,res) =>{
  try {
     const user = await User.findOne({ username: req.params['username'] })
     const followingUser = await User.findOne({
       username: req.params['follow'],
     });

     user.following.splice(user.following.indexOf(`${followingUser.username}`), 1);
     followingUser.followers.splice(followingUser.followers.indexOf(`${user.username}`), 1);
     await user.save()
     await followingUser.save()

      return res.status(201).send({
        success: true,
        massage: `${user.username} is un following to the user : ${followingUser.username}`,
      })
    
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: `Internal Server Error , while Fetching user By ID  `,
    })
  }
}


// controller for geting followers of a specific user
exports.getFollowerOFUser = async (req ,res) =>{
  try {
    const user = await User.findOne({ username: req.params['username'] })
    console.log(user);

    const followers = user.followers;

    return res.status(201).send({
      success: true,
      message: `followers of ${user.username} is fetched successfully`,
      followers: followers
    })

  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: `Internal Server Error , while Fetching user By ID  `,
    })
  }
}



// controller for geting followers of a specific user
exports.getFollowingOFUser = async (req ,res) =>{
  try {
    const user = await User.findOne({ username: req.params['username'] });
    console.log(user);

    const following = user.following;

    return res.status(201).send({
      success: true,
      message: `following of ${user.username} is fetched successfully`,
      following: following,
    })

  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: `Internal Server Error , while Fetching user By ID  `,
    })
  }
}