const { JWT_STRATEGIES } = require('./constants');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


const ExtractJwt = passportJWT.ExtractJwt;

const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.SECRET;
const JwtStrategy = passportJWT.Strategy;

passport.use(JWT_STRATEGIES.LOCAL, new JwtStrategy(jwtOptions, async function(jwtPayload, done) {
 //
}));


passport.use('facebook', new FacebookStrategy({
 clientID: process.env.FACEBOOK_APP_ID,
   clientSecret: process.env.FACEBOOK_APP_SECRET,
   callbackURL: process.env.FACEBOOK_CALLBACK_URL,
   profileFields: ['id', 'displayName', 'picture.width(200).height(200)', 'first_name', 'middle_name', 'last_name', 'gender', 'link', 'email']
 },
 function (accessToken, refreshToken, profile, done) {
  return done(null, profile);
}));

//
passport.use('google', new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: process.env.GOOGLE_REDIRECT_URL,
  profileFields: ['id', 'displayName', 'picture.width(200).height(200)', 'first_name', 'middle_name', 'last_name', 'gender', 'link', 'email']

},
 function (accessToken, refreshToken, profile, done) {
    // console.log('accessToken', accessToken);
    return done(null, profile);
}));

module.exports = passport;
