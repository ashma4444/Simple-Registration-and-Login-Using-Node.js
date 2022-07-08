// yo chae yedi user logged in cha vani login ra register page ma jana nadina that is logout garepachi matra jana dine
// ani user logout gareko cha vani home page ma jana nadina 

const isLogin = async(req, resp, next)=>{
    try{
        if(req.session.user_id){

        }
        else{
            resp.redirect('/');
        }
        next();
    }
    catch(err){
        console.log(err.message);
    }
}


const isLogout = async(req, resp, next)=>{
    try{
        if(req.session.user_id){
            resp.redirect('/home');
        }

        next();
    }
    catch(err){
        console.log(err.message);
    }
}

module.exports = {isLogin, isLogout};

