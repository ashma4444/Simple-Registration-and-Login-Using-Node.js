const express= require('express');
const user_route = express();
const body_parser = require('body-parser');
const multer= require('multer'); // for uploading image


const session = require('express-session');
const config= require("../config/config");

user_route.use(session({secret:config.sessionSecret}));

const auth = require('../middleware/auth');




// for uploading image
const path = require('path');


// profile ma image dekhauna ko lagi path
user_route.use(express.static('public'));
// this gives public folder ko path jasko through bata we can get images

// image upload garna ko lagi
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, path.join(__dirname, '../public/userimages'))
    },
    filename:function(req,file,cb){
        const name = Date.now()+'-'+file.originalname;
        // const name = Date.now();
        cb(null, name);
    }
});

const upload = multer({storage:storage}); // for uploading image

user_route.set('view engine', 'ejs');
user_route.set('views', './views/users');


user_route.use(body_parser.json());
user_route.use(body_parser.urlencoded({extended:true}));

const userController = require('../controllers/userController');

user_route.get('/register', auth.isLogout,userController.loadRegister);
user_route.get('/', auth.isLogout, userController.loadLogin);
user_route.get('/login', auth.isLogout, userController.loadLogin);
user_route.get('/home', auth.isLogin, userController.loadHome);
user_route.get('/mainHome', userController.loadMainHome);
user_route.get('/logout', auth.isLogin, userController.loadLogout);

user_route.post('/register',upload.single('image'),userController.insertUser);
// upload.single('image') here 'image' is from registration form ko input ko name 

user_route.post('/login',userController.verifyLogin);

module.exports = user_route;