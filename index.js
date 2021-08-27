const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');

// express helpers **maybe not sure what to call these**
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const flash = require('connect-flash');
const engine = require('ejs-mate');
const app = express();
const {isLoggedIn} = require('./middleware/authLogin');

// require routes
const elpRoutes = require('./routers/elpCamp');
const reviewRoutes = require('./routers/review')
const userRoutes = require('./routers/users')

// Utilities
const OnError = require('./utils/OnError');

// models
const User = require('./models/user')
// mongoose connection
mongoose.connect('mongodb://localhost:27017/elpCamp',{ 
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
}); 

// Middleware stuff and app.set and engine
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
        // name: 'free cookies',
        secret: 'idgafsodgaf',
        resave: true,
        httpOnly: true,
        saveUninitialized: false,
        cookie: {
            expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
            maxAge: 1000 * 60 * 60 * 24 * 7
        }}));

//passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//flash
app.use(flash());
app.use((req, res, next) => {
    res.locals.loggedIn = req.session.loggedIn;
    res.locals.notice = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

//engine and view
app.engine('ejs', engine);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Routes
app.get('/', (req, res) => {
    res.redirect('/elpers');
});
app.use('/u(ser)?', userRoutes);
app.use('/elpers', elpRoutes, reviewRoutes);



// Error routes
app.all('*', (req, res, next) => {
    next(new OnError('Page Not Found'), 404);
});


app.use((err, req, res, next) => {
    const { status = 500 } = err;
    if(!err.message) err.message = 'Some Error happened check on your side while we do on ours :D'
   res.status(status).render('errors/404', {err})
});

app.listen(3000, () => {
    console.log('port 3000')
});