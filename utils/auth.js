const withAuth = (req, res, next) => {
  console.log('checking AUTHORIZATION: ');

    if (!req.session.user_id) {
      console.log('-------------------------- FAILED.');
      res.redirect('/login');
    } else {
      console.log('##################### PASSED !!!!!!.')

      next();
    }
  };
  
  module.exports = withAuth;