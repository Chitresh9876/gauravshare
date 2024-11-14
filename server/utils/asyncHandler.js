const asyncHandler = (reqHandler)=>{
    // heigher order function return karega
    return (req,res,next)=>{
      Promise.resolve(reqHandler(req, res, next)).catch(next);
    }

}

module.exports = asyncHandler;