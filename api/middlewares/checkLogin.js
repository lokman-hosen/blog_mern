import jwt from "jsonwebtoken";

export const checkLogin = async (req, res, next)=>{
  const { authorization} = req.headers;
  res.status.json(req.headers)
  // try{
  //     const token = authorization.$split(' ')[1]
  //     jwt.verify(token, process.env.JWT_SECRET);
  //     next()
  // }catch (error){
  //     next("Authentication fail")
  // }
}