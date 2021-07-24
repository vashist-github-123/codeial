const User = require('../models/user');
const fs = require('fs');
const path = require('path');



module.exports.profile = function(req, res){

   // return res.end("<h1>User Profile</h1>");

   User.findById(req.params.id, function(err, user){
       
    return res.render('user_profile', {
        title: "User Profile",
        profile_user: user


   });
   });
};

module.exports.update =  async function(req, res){
//     if(req.user.id==req.params.id){

//         User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
//             return res.redirect('back');
      
    
//     });
// }else{
//     return res.status(401).send('Unauthorize');
// }
// }

        if(req.user.id==req.params.id){

            try{

                let user = await User.findById(req.params.id);
                User.uploadedAvatar(req, res, function(err){
                    if(err){console.log('******multererror', err )}
                    console.log(req.file);

                    user.name = req.body.name;
                    user.email = req.body.email;

                    if(req.file){

                        if(user.avatar){
                            fs.unlinkSync(path.join(__dirname,'..', user.avatar));
                        }





                        // this is saving the path of the uploaded file into the avatar field in the user

                        user.avatar = User.avatarPath + '/' + req.file.filename;

            
                    }
                    user.save();

                    return res.redirect('back');
                });


            }catch(err){
                req.flash('error', err);
                res.redirect('back');

            }
            
            }else{
            req.flash('error', 'Unauthorize!');
            return res.status(401).send('Unauthorize');

        }

}



// render the signup page

module.exports.signUp = function(req, res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    });
}

//render SignIn page

module.exports.signIn = function(req, res){

    if(req.isAuthenticated()){

       return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
       title: "Codeial | Sign In" 
    });
}

// get the signup data

module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
    return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){

        if(err){console.log("error in finding user in signing up"); return}
        

        if (!user){
            User.create(req.body, function(err, user){
                if(err){ console.log("error in creating user while signup"); return}
                return res.redirect('/users/sign-in');

            })


        } else{
            return res.redirect('back');
        }
        

    });
}






module.exports.createSession = function(req, res){
    console.log("hello I am here")
     // req.flash('success', 'logged in successfully');
   return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.flash('success', 'logged out succesfully');

    req.logout();

    return res.redirect('/');
}