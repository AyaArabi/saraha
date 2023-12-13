import joi from 'joi'

export const signupSchema ={
body:joi.object({
    userName:joi.string().required().alphanum(),
    email:joi.string().email().required(),
    Gender:joi.string().valid('Male','Female'),
    password:joi.string().required().max(20).min(3),
    Cpassword:joi.string().valid(joi.ref('password')).required(),
    age:joi.number().integer().min(20).max(80)
}),

}


export const signinSchema = joi.object({
    email:joi.string().email().required().messages({
        'string.empty':"email is required",
        'string.email':"plz enter the valid email"
    }),
    password:joi.string().required().max(20).min(3),
    }) 