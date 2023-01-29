const express = require("express");
const router = express.Router();
const authUser = require("../controllers/auth.user.controller");
const middleware = require("../middlewares/signupMiddleware");
const jwtAuth = require("../middlewares/jwtToken");

// Signup -- user -- POST request
router.post('/new/:username', [middleware.signupMiddleware], authUser.signup)

// Signin -- user -- POST request
router.post('/login',  authUser.signin)

// get all the user -- GET request
router.get('/all', authUser.getAllUser);

// getinfo -- specific user -- GET request
router.get('/info/:username', [jwtAuth.verifyToken] , authUser.getUserByID);

// follow a user -- POST request
router.post('/:username/:follow', [jwtAuth.verifyToken], authUser.followAUser)

// unfollow a user -- DELETE request
router.delete('/:username/:follow', [jwtAuth.verifyToken] , authUser.unfollowAUser)


// Retrieve a list of followers for a specific user -- GET request
router.get('/:username/followers', [jwtAuth.verifyToken] , authUser.getFollowerOFUser);

//Retrieve a list of following a specific user  -- GET request
router.get('/:username/following', [jwtAuth.verifyToken] , authUser.getFollowingOFUser);


module.exports = router;