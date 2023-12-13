import joi from 'joi'
const dataMethods =['body','headers','query' ,'params']
export const validation =(Schema)=>{

return (req,res,next )=>{
    const validateResult=[];

    dataMethods.forEach((key)=>{
      if(Schema[key]){
      const validateSchema =Schema[key].validate(req[key],{abortErly:false})
      if(validateSchema.error)
      validateResult.push(validateSchema.error.details);
    }}
    )

  
     if(validateResult.length>0){
        return res.status(400).json({message:"un validation data",error:validateResult})
     }
     else{
       return  next();
     }
}
}