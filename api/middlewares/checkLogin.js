import jwt from "jsonwebtoken";

export const checkLogin = async (req, res, next)=>{
  const { authorization} = req.headers;
 // console.log(authorization)
  //res.status.json(req.headers)
  //console.log(req.headers.authorization.split(' ')[1]);
  //res.status.json('Middleware')
  try{
      const token = authorization.split(' ')[1]
      jwt.verify(token, process.env.JWT_SECRET);
      next()
  }catch (error){
      next("Authentication fail")
  }
}