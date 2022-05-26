const express = require('express');
const booksRouter = require("./router/BooksRouter")
const userSessionsRouter = require("./router/UserSessionsRouter")
const vendorsRouter = require("./router/VendorsRouter")
const customersRouter = require("./router/CustomersRouter")
const ordersRouter = require("./router/OrdersRouter")
const usersRouter = require("./router/UsersRouter")

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use("/", userSessionsRouter)
app.use("/books", booksRouter)
app.use("/vendors", vendorsRouter)
app.use("/customers", customersRouter)
app.use("/orders", ordersRouter)
app.use("/users", usersRouter)



//error handler
app.use(function(err, req, res, next){
  console.log(err.message)
  console.log(err.stack);    // e.g., Not valid name
  return res.status(500).send({error: 'Internal Server Error'});
});



// Create a catch-all route.
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to Bookstore API',
}));


const port = 5000;
app.listen(port, () => {
  console.log('App is now running at port ', port)
})