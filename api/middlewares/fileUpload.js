import multer from "multer";

export const fileUpload = async (req, res, next)=>{

  try{
      const storage = multer.diskStorage({
          // destination: function (req, file, cb) {
          //     cb(null, '/tmp/my-uploads')
          // },
          destination: "uploads",
          filename: function (req, file, cb) {
              //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
              cb(null, file.originalname)
          }
      });

      const upload = multer({
          storage: storage
      }).single('image')
      upload(req, res, function () {
          console.log('file uploaded')
      })
      next()
  }catch (error){
      //next("Authentication fail")
      res.status(500).json({
          'status': false,
          'message' : 'Upload Fail',
      })
  }
}