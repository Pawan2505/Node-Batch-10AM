
const Users = require('../models/users.model');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');


module.exports.userRegister = async(req,res)=>{
    try{
        console.log(req.body);
        let existingUser = await Users.findOne({ email: req.body.email });
        if (!existingUser) {

            if(req.body.password === req.body.confirm_password){

                req.body.password = await bcrypt.hash(req.body.password, 10);
                let newUser = await Users.create(req.body);

                if(newUser){
                    return res.status(201).json({ message: 'User registered successfully',"data":newUser });
                }

            }else{
                return res.status(400).json({ message: 'Passwords do not match' });
            }

        }else{
            return res.status(400).json({ message: 'User already exists' });

        }
    }catch(error){
        console.error(`Error in userRegister: ${error}`);
       return res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports.userLogin = async(req,res)=>{
    try{

        console.log(req.body);

        let  emailExist = await Users.findOne({ email: req.body.email });

        if(emailExist){

            if(await bcrypt.compare(req.body.password, emailExist.password)){
                let token = jwt.sign({userData: emailExist},'RNW',{expiresIn: '1h'});
                return res.status(200).json({ message: 'Login successful', token: token });
            }else{
                return res.status(400).json({ message: 'Invalid password' });
            }

        }else{
            return res.status(400).json({ message: 'User does not exist' });
        }

    }catch(error){
        console.error(`Error in userLogin: ${error}`);
       return res.status(500).json({ message: 'Internal server error' });
    }
}
