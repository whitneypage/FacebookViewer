var express = require('express');
var session = require('express-session');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

var app = express();

app.use(session({
	secret:'*1435453647899hiuhjkn',
	saveUninitialized: false,
	resave: true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new FacebookStrategy({
  clientID: '107536862911303',
  clientSecret: 'de23e030341dea0c5df20be8388d60c1',
  callbackURL: 'http://localhost:9000/auth/facebook/callback'
}, function(accessToken, refreshToken, profile, done) {
  return done(null, profile);
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});



app.get('/', function(req, res) {
	res.send('hello');
})

app.get('/confirm/success', function(req, res) {
	res.send('success');
})

app.get('/confirm/failure', function(req, res) {
	res.send('failure');
})


app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
	successRedirect: '/confirm/success',
	failureRedirect: '/confirm/failure'
}));

app.get('/me', function(req, res) {
	res.send(req.user);
});



app.listen(9000);