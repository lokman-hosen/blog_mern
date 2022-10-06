import jwt from "jsonwebtoken";

export const checkLogin = async (req, res, next)=>{
  const { authorization} = req.headers;

  try{
      const token = authorization.split(' ')[1]
      //const token = authorization
      let result = jwt.verify(token, process.env.JWT_SECRET);
      req.user = result;
      next()
  }catch (error){
      //next("Authentication fail")
      res.status(500).json({
          'status': false,
          'message' : 'Authentication Fail',
      })
  }
}