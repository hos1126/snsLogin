const GoogleStrategy = require("passport-google-oauth20").Strategy;

module.exports = passport => {
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
};
