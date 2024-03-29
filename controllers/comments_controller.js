const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');
const commentEmailWorker = require('../workers/comment_email_worker');
const queue = require('../config/kue');
module.exports.create = async function(req, res){


        try{
    let post = await Post.findById(req.body.post);

    if(post){
        let comment = await Comment.create({
            content: req.body.content,
            post: req.body.post,
            user: req.user._id
        });

        post.comments.push(comment);
        post.save();


        comment = await comment.populate('user', 'name email').execPopulate();
        // commentMailer.newComments(comment);
        let job = queue.create('emails', comment).save(function(err){
            // console.log("Email started")
            if(err){
                console.log('error in creating a queue', err); return;
            }
                console.log('job enqueued', job.id);
        });
        
        if(req.xhr){
            

            return res.status(200).json({
                data:{
                    comment: comment
                },
                message: "post created"
            })
        }

        req.flash('success', 'comment published');

        res.redirect('/');
    

        }

    }
    catch(err){
        req.flash('error', 'unauthorized');
        return res.redirect('back');
        // console.log("Error at comment create ", err);
    }
    
    
    
}

    module.exports.destroy = async function(req, res){

        try{

        let comment = await Comment.findById(req.params.id);

            if (comment.user== req.user.id){
              let postId = comment.post;
              comment.remove();

              let post = await Post.findByIdAndUpdate(postId, {$pull:{comments: req.params.id}});

                  return res.redirect('back');

              

            } else{
                  return res.redirect('back');
              }

        }
        catch(err){
            console.log("error at comments destroy", err);
        }

            
        
    }
