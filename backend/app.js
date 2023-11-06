const express = require('express');
const app = express();
const db = require("./models/index");
const cors = require('cors');
var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// Settings
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


app.use(express.static(path.join(__dirname, "public")));

var corsOption = {
  origin: "*"
};

app.use(cors(corsOption));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.")
// });



// view engine setup
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
// app.use('/', indexRouter);
// app.use('/users', usersRouter);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
