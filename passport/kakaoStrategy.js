const KakaoStrategy = require("passport-kakao").Strategy;

module.exports = passport => {
  passport.use(
    "kakaoLogin",
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_CLIENTID,
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
};
