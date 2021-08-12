
const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

// variable which shows where the logs will be stored
const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
});





const development = {
    name: 'development',
    asset_path: '/assets',
    session_cookie_key: 'blahsomething',
    db: 'codeial_development',
    smtp: {
    service: 'gmail',
    host:'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {

        user: 'anil.akashvaani@gmail.com',
        pass: 'ixblhpebmlmluexw'
    }




},
google_client_id: "206926849437-r5ks9bv42d0t1kbb5f1jl8p0arnkstp8.apps.googleusercontent.com",
google_client_secret: "1IrRIW6H4y0KQ0GuJ5-iF1kT",
google_call_back_url: "http://localhost:8000/users/auth/google/callback",
jwt_secret: 'codeial',
morgan: {
    mode: 'dev',
    options: {stream: accessLogStream}
}


}

const production = {
    name: 'production',
    asset_path: process.env.CODEIAL_ASSET_PATH,
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
    db: process.env.CODEIAL_DB,
    smtp: {
    service: 'gmail',
    host:'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {

        user: process.env.CODEIAL_USERNAME,
        pass: process.env.CODEIAL_PASSWORD
    }



},
google_client_id: process.env.CODEIAL_GOOGLE_CLIENT_ID,
google_client_secret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
google_call_back_url: process.env.CODEIAL_GOOGLE_CALLBACK_URL,
jwt_secret: process.env.CODEIAL_JWT_SECRET,
morgan: {
    mode: 'combined',
    options: {stream: accessLogStream}
}

}


module.exports = eval(process.env.CODIEAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);
// eval(process.env.CODIEAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);