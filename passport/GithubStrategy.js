const GitgubStrategy = require("passport-github").Strategy;

module.exports = passport => {
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
};
