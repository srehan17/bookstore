const express = require('express');
const booksRouter = require("./router/BooksRouter")
const userSessionsRouter = require("./router/UserSessionsRouter")

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());




app.use("/", userSessionsRouter)
app.use("/books", booksRouter)


// Create a catch-all route.
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to Bookstore API',
}));


const port = 5000;
app.listen(port, () => {
  console.log('App is now running at port ', port)
})