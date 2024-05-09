const LocalStrategy=require('passport-local').Strategy;
const passport = require('passport');
const User=require("./Models/userModel")

// verification function 
passport.use(new LocalStrategy(async (USERNAME,password,done)=>{
    // authentication logic 
    try {
     
     const user= await User.findOne({username:USERNAME});
     if(!user)
        return done(null,false,{message:"Incorrect username"});

    const isPasswordMatch=await user.comparePassword(password);
    if(isPasswordMatch){
        return done(null,user);
    }else{
        return done(null,false,{message:"Incorect password"})
    }
    } catch (error) {
        return done(error);
    }
}))

module.exports=passport;