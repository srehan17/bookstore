const express = require('express');
const passport = require('passport');

const booksRouter = require("./router/BooksRouter")

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



passport.use(new BearerStrategy(
    function(token, done) {
        return done(null, null, { scope: 'all' });
        // User.findOne({ token: token }, function (err, user) {
        // if (err) { return done(err); }
        // if (!user) { return done(null, false); }
        // return done(null, user, { scope: 'all' });
        // });
    }
));


app.use("/books", booksRouter)


// Create a catch-all route.
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to Bookstore API',
}));


const port = 5000;
app.listen(port, () => {
  console.log('App is now running at port ', port)
})