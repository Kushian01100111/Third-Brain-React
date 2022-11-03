const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");

exports.getUser =(req,res) =>{
  res.status(200).send({ user: req.user || null });
}


exports.getLogin = (req, res) => {
  if (req.user) {
    return res.redirect("/main");
  }
  res.render("login", {
    title: "Login",
  });
};
 //POST login
exports.postLogin = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (validator.isEmpty(req.body.password))
    validationErrors.push({ msg: "Password cannot be blank." });

  if (validationErrors.length) {
    return res.status(406).send({
      errors: validationErrors,
    });
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash("errors", info);
      return res.redirect("/login");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      console.log(req.session)
      res.status(200).send({
        done: true, 
        user: user,
        session: req.session});
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout(() => {
    console.log('User has logged out.')
  })
  req.session.destroy((err) => {
    if (err)
      console.log("Error : Failed to destroy the session during logout.", err);
    req.user = null;
    res.redirect("/");
  });
};

//Get request (Depriqueted)
exports.getSignup = (req, res) => {
  if (req.user) {
    return res.redirect("/main");
  }
  res.render("signup", {
    title: "Create Account",
  });
};

 //POST request Valid one 
exports.postSignup = (req, res, next) => {
  console.log(req.body)
  const validationErrors = [];
  if (!validator.isEmail(req.body.email)){
    validationErrors.push({ msg: "Please enter a valid email address." });
  }
    
  if (!validator.isLength(req.body.password, { min: 8 })){
    validationErrors.push({
      msg: "Password must be at least 8 characters long",
    });
  }
    
  if (validationErrors.length) {
    return res.status(406).send({
      errors: validationErrors,
    });
  }


  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  const user = new User({
    userName: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  User.findOne(
    { $or: [{ email: req.body.email }, { userName: req.body.userName }] },
    (err, existingUser) => {
      if (err) {
        return next(err);
      }
      if (existingUser) {
        return res.status(409).send({
          errors: "Account with that email address or username already exists."
        });
      }
      user.save((err) => {
        if (err) {
          return next(err);
        }
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          console.log('Account created')
          res.status(200).send({
            done: true, 
            user: user});
        });
      });
    }
  );
};
