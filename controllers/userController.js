const User = require('../models/userModel'); // model
const bcrypt = require('bcrypt');

// const nodemailer = require('nodemailer'); // email verification

const securePassword = async(password)=>{
    try{
        const passwordHash = await bcrypt.hash(password, 10);
        return passwordHash;
    }
    catch(err){
        console.log(err.message);
    }
}


// method for sending main to the respective email address mentioned in the registration form
// const sendVerifyMail = async (name, email, id) =>{
//     try{

//     }
//     catch(err){
//         console.log(err.message);
//     }
// };


const loadRegister = async (req, resp) =>{
    try{
        resp.render("register")
    }
    catch(err){
        console.log(err.message);
    }
}



const loadLogin = async (req, resp) =>{
    try{
        resp.render("login")
    }
    catch(err){
        console.log(err.message);
    }
}


const loadHome = async (req, resp) =>{
    try{
        // showing profile details - getting data from database
        const userData = await User.findById({_id: req.session.user_id});

        resp.render("home", {user: userData});
    }
    catch(err){
        console.log(err.message);
    }
}

const loadMainHome = async (req, resp) =>{
    try{
        resp.render("mainHome")
    }
    catch(err){
        console.log(err.message);
    }
}

// register
const insertUser = async (req,resp) =>{
    try{
        const secPass = await securePassword(req.body.password);
        const user = new User({
            firstname: req.body.fname,
            lastname: req.body.lname,
            email: req.body.email,
            mobile: req.body.phone,
            image: req.file.filename,
            password: secPass,
            isAdmin:0
        });

        const userData = await user.save();

        if(userData){
            // userData ture that is user data database ma gaye pachi mail verification garna lai
            // npm i nodemailer
            // sendVerifyMail(req.body.fname, req.body.email, userData._id); 
            // userData._id -> database ko id -> form bata aaune haina so req.body. hudaina ..


            resp.render('register', {message: "Successful registration."});
        }

        else{
            resp.render('register', {message: "Failed registration"});

        }
    }

    catch(err){
        console.log(err.message);
    }
};



// login
const verifyLogin = async(req,resp)=>{
    try{
        const email= req.body.email;
        console.log(`Email is ${req.body.email}`);
        console.log(req.body.password);
        
        const password = req.body.password;

        // database ko model ma data cha ki chaina check garna lai
        const userEmail = await User.findOne({email:email});
        // User.findOne({email}); // OR
        // .findOne({email -> email field from database : email -> above email variable received from login form})

        if(userEmail){
            // if user email correct raicha vane aba password ni database ma vako jastai cha ki chaina check garne
            const passwordMatch = await bcrypt.compare(password, userEmail.password);
            console.log("email correct")
            // 1st parameter password is received from login form , 2nd from database

            if(passwordMatch){
                req.session.user_id = userEmail._id; 
                resp.redirect('/home');
            }
            else{
                resp.render('login', {message: "Incorrect email and password."});

            }

        }

        else{
            resp.render('login', {message: "Incorrect email and password."});
        }
    }

    catch(err){
        console.log(err.message);
    }
}



const loadLogout=async(req, resp)=>{
    try{
        req.session.destroy();
        resp.redirect('login');
    }

    catch(err){
        console.log(err.message);
    }
};

module.exports={loadRegister, insertUser, loadLogin, loadHome, verifyLogin, loadLogout, loadMainHome}