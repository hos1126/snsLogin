const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;
const NaverStrategy = require("passport-naver").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const GitgubStrategy = require("passport-github").Strategy;
require("dotenv").config();

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "snsLogin",
    cookie: {
      httpOnly: true,
      secure: false
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);
app.get("/kakao", passport.authenticate("kakaoLogin"));
app.get(
  "/kakao/callback",
  passport.authenticate("kakaoLogin", {
    failureRedirect: "/",
    successRedirect: "/"
  })
);
app.get("/naver", passport.authenticate("naverLogin"));
app.get(
  "/naver/callback",
  passport.authenticate("naverLogin", {
    failureRedirect: "/",
    successRedirect: "/"
  })
);

app.get(
  "/google",
  passport.authenticate("googleLogin", { scope: ["profile"] })
);
app.get(
  "/google/callback",
  passport.authenticate("googleLogin", {
    failureRedirect: "/",
    successRedirect: "/"
  })
);

app.get("/facebook", passport.authenticate("facebookLogin"));
app.get(
  "/facebook/callback",
  passport.authenticate("facebookLogin", {
    failureRedirect: "/",
    successRedirect: "/"
  })
);

app.get("/github", passport.authenticate("githubLogin"));
app.get(
  "/github/callback",
  passport.authenticate("githubLogin", {
    failureRedirect: "/",
    successRedirect: "/"
  })
);

app.use("/users", usersRouter);

app.use("/users", usersRouter);

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  "kakaoLogin",
  new KakaoStrategy(
    {
      clientID: "7c2ef2c7023940750b689ca4c1d7924f",
      callbackURL: "/kakao/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      const user = {
        id: profile.id,
        username: profile.username,
        provider: profile.provider
      };
      done(null, user);
    }
  )
);

passport.use(
  "naverLogin",
  new NaverStrategy(
    {
      clientID: "GhTn0gyQPXSbXro5ap3O",
      clientSecret: "T8hsiyDDtH",
      callbackURL: "/naver/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      const user = {
        id: profile.id,
        username: profile._json.nickname,
        provider: "naver"
      };
      done(null, user);
    }
  )
);

passport.use(
  "googleLogin",
  new GoogleStrategy(
    {
      clientID:
        "833655648531-jtapm1ae1glsup367ugor7vc7h1famkf.apps.googleusercontent.com",
      clientSecret: "Mxzm62wtBIFgmCighnYikxKG",
      callbackURL: "/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      const user = {
        id: profile.id,
        username: profile.name.familyName,
        provider: profile.provider
      };
      done(null, user);
    }
  )
);

passport.use(
  "facebookLogin",
  new FacebookStrategy(
    {
      clientID: "661052874664588",
      clientSecret: "0b8a5cd4547bb8715681b2ebde77e798",
      callbackURL: "/facebook/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      const user = {
        id: profile.id,
        username: profile.displayName,
        provider: profile.provider
      };
      done(null, user);
    }
  )
);

passport.use(
  "githubLogin",
  new GitgubStrategy(
    {
      clientID: "7f9ecc3b7830de2f3112",
      clientSecret: "d31ee6315f99a6a9bbb97e26877c7da6663abf53",
      callbackURL: "/github/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      const user = {
        id: profile.id,
        username: profile.username,
        provider: profile.provider
      };
      done(null, user);
    }
  )
);

module.exports = app;
