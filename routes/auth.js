const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get("/kakao", passport.authenticate("kakaoLogin"));
router.get(
  "/kakao/callback",
  passport.authenticate("kakaoLogin", {
    failureRedirect: "/",
    successRedirect: "/"
  })
);
router.get("/naver", passport.authenticate("naverLogin"));
router.get(
  "/naver/callback",
  passport.authenticate("naverLogin", {
    failureRedirect: "/",
    successRedirect: "/"
  })
);

router.get(
  "/google",
  passport.authenticate("googleLogin", { scope: ["profile"] })
);
router.get(
  "/google/callback",
  passport.authenticate("googleLogin", {
    failureRedirect: "/",
    successRedirect: "/"
  })
);

router.get("/facebook", passport.authenticate("facebookLogin"));
router.get(
  "/facebook/callback",
  passport.authenticate("facebookLogin", {
    failureRedirect: "/",
    successRedirect: "/"
  })
);

router.get("/github", passport.authenticate("githubLogin"));
router.get(
  "/github/callback",
  passport.authenticate("githubLogin", {
    failureRedirect: "/",
    successRedirect: "/"
  })
);

module.exports = router;
