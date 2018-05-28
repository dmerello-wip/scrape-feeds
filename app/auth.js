const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const appConfig = require('./config.js');

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    passport.use(new GoogleStrategy({
            clientID: '1068644869154-het8op932rma4kn3ih9pi4v8069512ff.apps.googleusercontent.com',
            clientSecret: 'OKNUe64q_pfj-AxA7MqDeJfv',
            callbackURL: appConfig.paths.baseUrl+'/auth/google/callback'
},
    (token, refreshToken, profile, done) => {
        return done(null, {
            profile: profile,
            token: token
        });
    }));
};