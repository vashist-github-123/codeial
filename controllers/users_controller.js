const User = require('../models/user');



module.exports.profile = function(req, res){

   // return res.end("<h1>User Profile</h1>");

   return res.render('user_profile', {
       title: "profile"

   });
};

// render the signup page

module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}

//render SignIn page

module.exports.signIn = function(req, res){
    return res.render('user_sign_in', {
       title: "Codeial | Sign In" 
    })
}

// get the signup data

module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
    return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){

        if(err){console.log("error in finding user in signing up"); return;}
        

        if (!user){
            User.create(req.body, function(err, user){
                if(err){ console.log("error in creating user while signup"); return;}
                return res.redirect('/users/sign-in');

            })


        } else{
            return res.redirect('back');
        }
        

    })
}






module.exports.createSession = function(req, res){
    // to do later
}