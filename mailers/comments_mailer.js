const nodeMailer = require('../config/nodemailer');
const { getMaxListeners } = require('../models/user');

// this is another way of transporting a method
exports.newComments = (comment) => {

    // making a htmlString variable that would give html file from the path.
    let htmlString = nodeMailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');
    console.log('inside new comment mailer');
    nodeMailer.transporter.sendMail({
        from: 'anil.akashvaani@gmail.com',
        to: comment.user.email,
        subject: "New comment published",
        html: htmlString
}, (err, info) => {
    if(err){ console.log("error occured at comment email", err); return; }

    console.log('message sent', info);
    return;


});
}