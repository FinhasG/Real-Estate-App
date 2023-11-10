const userSchema=require('../models/User')
const Joi=require('joi');
const bcrypt=require('bcryptjs');
const {errorHandler}= require('../utils/error.js')


const SignUp=async(req,res,next)=>{
    const { username, email, password } = req.body
    const schema = Joi.object({
        username: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),

        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

        password: Joi.string(),
    })
    
    try {
        const validateResults = schema.validate(req.body)
        if (validateResults.error) {
            // res.send(validateResults.error).status(400)
            res.status(400).json({msg:"error"})
        } else {

            const user = new userSchema({
                username: username,
                email:email,
                password: await bcrypt.hash(password, 10),

            })
            try {
                await user.save()
            res.status(200).json("successfully registered")
            } catch (error) {
                next(error)
            }
            //redirect('/login')
        }
    } catch (error) {
        next (error);
    }



}

module.exports={SignUp}