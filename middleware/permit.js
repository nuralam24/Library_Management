const jwt_decode = require("jwt-decode");

module.exports = function permit(userType) {
  return function (req, res, next) { 
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({
        message: 'Unauthorized'
    });

    try {
      let decode = jwt_decode(token)
      const verified = decode.userType == userType;
      if (verified) next();
      else next(res.status(401).json({
        message: `You don't have permission`
      }))
    }
    catch (err) {
      res.status(401).json({
        message: `You don't have permission`
      });
    }
  }
}
  