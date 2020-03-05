const NaverStrategy = require("passport-naver").Strategy;

module.exports = passport => {
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
};
