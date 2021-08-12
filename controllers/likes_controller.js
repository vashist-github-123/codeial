const Like = require('../models/like');

const Post = require('../models/post');

const Comment = require('../models/comment');

module.exports.toggleLike = async function(req, res){

    try{

        // likes/toggle/?id=abcdef&type=Post
        let likeable;
        let deleted = false;

        if(req.query.type = 'Post'){
            likeable = await Post.findById(req.query._id).populate('likes');
        } else{
            likeable = await Comment.findById(req.query._id).populate('likes');

        }

        //just need to check if the like already exisited

        let existingLike = await Like.findOne({
            likeable: req.query.id,
            onModel: req.query.type,
            user: req.user._id
        });

        // if the like already exist

        if(existingLike){
            likeable.likes.pull(existingLike._id);
            likeable.save();

            existingLike.remove();
            deleted: true;

        }else{
            // make a new like
            let newLike = await Like.create({
                user: req.user._id,
                likeable: req.query.id,
                onModel: req.query.type
            });

            likeable.likes.push(like._id);
            like.save();
        }

        return res.json(200, {
            message: "request successful",
            data: {

                deleted: deleted
            }
        });

        


    }
    catch(err){
        console.log(err);
        return res.json(500, {
            message: 'Internal Server Error'
        });

    }
}

