const kakao = require("./kakaoStrategy");
const naver = require("./NaverStrategy");
const github = require("./GithubStrategy");
const facebook = require("./FacebookStrategy");
const google = require("./GoogleStrategy");

module.exports = passport => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
  kakao(passport);
  naver(passport);
  github(passport);
  facebook(passport);
  google(passport);
};
