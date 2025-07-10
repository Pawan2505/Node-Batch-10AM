
module.exports.checkAdminAuth = (req, res, next) => {
  if (req.cookies && req.cookies.adminId) {
    return next(); // Continue to the requested route
  } else {
    return res.redirect("/signin"); // Not authenticated
  }
};
