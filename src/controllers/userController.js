const User = require("../models/user");
const bcrypt = require("bcrypt");

// Create user / Signup
module.exports.createUser = async (req, res, next) => {
  const user = new User(req.body);
  try {
    
  await user.hash();  // hasing

  const j = await user.createJwt(); // assiging token

  res.cookie("token",j);    // storing in cookies
  await user.save();     // saving   

  res.status(200).json({ user, message: true });
  } catch (error) {
    res.status(400).send('email already exists');
  }
};

// Login user
module.exports.loginUser = async (req, res, next) => {
  
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({email});  // finding user by email
    // console.log(user)
    const j = await user.createJwt();

    res.cookie("token",j);
    
    if (!user) {
      throw new Error('no user available with that email');
    }
    const isMatch = await bcrypt.compare(password, user.password);  // comparing saved password with user password
    
    // console.log(isMatch)
    if (!isMatch) {
      throw new Error('password not correct');
    }
    
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};


// Logout user
module.exports.logoutUser = async (req, res, next) => {
  try {
    res.cookie("token", null, {     // getting token from cookie
      expires: new Date(Date.now()),    // setting expiry of token
      httpOnly: true
  });
  res.status(200).json({success: true, message: "logged out"});
  } catch (error) {
    res.status(400).send(error);
  }
};
