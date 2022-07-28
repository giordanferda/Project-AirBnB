const express = require('express'); // handling async route handlers
require('express-async-errors'); //handling async route handlers
const morgan = require('morgan'); // logging information about server requests/responses
const cors = require('cors');
const csurf = require('csurf'); // CSRF protection
const helmet = require('helmet'); //security middleware
const cookieParser = require('cookie-parser'); //parsing cookies from requests

const { environment } = require('./config');
const isProduction = environment === 'production'; //Create a variable called isProduction that will be true if the environment is in production or not by checking the environment key in the configuration file (backend/config/index.js):
const { ValidationError } = require('sequelize');
const app = express();

//backend/app.js
const routes = require('./routes');
app.use(morgan('dev')); //Connect the morgan middleware for logging information about requests and responses:
app.use(cookieParser()); //Add the cookie-parser middleware for parsing cookies and the express.json middleware for parsing JSON bodies of requests with Content-Type of "application/json".
app.use(express.json());



//Security middleware
//Only allow CORS (Cross-Origin Resource Sharing) in development using the cors
//  middleware because the React frontend will be served from a different server
//  than the Express server. CORS isn't needed in production since all of our
//  React and Express resources will come from the same origin.
if (!isProduction){
  app.use(cors());
}
// helmet helps set a variety of headers to better secure your app
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin"
  })
  );
  // Enable better overall security with the helmet middleware
  // (for more on what helmet is doing, see helmet on the npm registry).
  // React is generally safe at mitigating XSS (i.e., Cross-Site Scripting)
  // attacks, but do be sure to research how to protect your users from such
  // attacks in React when deploying a large production application.
  // Now add the crossOriginResourcePolicy to the helmet middleware
  // with a policy of cross-origin.
  // This will allow images with URLs to render in deployment.



  // Set the _csrf token and create req.csrfToken method
  // Add the csurf middleware and configure it to use cookies.
  app.use(
    csurf({
      cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
      }
    })
    );
    app.use(routes); //connecting all the routes
// backend/app.js
// ...
// Catch unhandled requests and forward to error handler.
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;
  next(err);
});


app.use((err, _req, _res, next) => {
  // check if error is a Sequelize error:
  if (err instanceof ValidationError) {
    err.errors = err.errors.map((e) => e.message);
    err.title = 'Validation error';
  }
  next(err);
});

app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack
  });
});



module.exports = app
