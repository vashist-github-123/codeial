const queue = require('../config/kue');

const commentsMailer = require('../mailers/comments_mailer');
// whenever the new task is added you need to run inside the process function.  
queue.process('emails', function(job, done){
    console.log('emails worker is processing a job', job.data);
    commentsMailer.newComments(job.data);
    done();
});