const FacebookStrategy = require("passport-facebook").Strategy;

module.exports = passport => {
  passport.use(
    "facebookLogin",
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_CLIENTID,
        clientSecret: process.env.FACEBOOK_CLIENTSECRET,
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
};
