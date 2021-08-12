const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,

    },
    // this defines the object id of the liked object.
    likeable:{
        type: mongoose.Schema.ObjectId,
        required: true,
        refpath: 'onModel'

    },
    // this field is used for defining the type of liked objects since this is the liked object.
    onModel:{
        type: String,
        required: true,
        enum: ['Post', 'Comment']

    }


}, {
    timestamps: true
});


// tell mongoose that it is a model. Which will be defined by likeSchema.

const Like = mongoose.model('Liked', likeSchema);

module.exports = Like;