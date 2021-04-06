const express = require('express');
require('dotenv').config();

const colors = require('colors');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');

const connectDB = require('./config/db.js');
const passport = require('./config/passport.js');
const productRoutes = require('./routes/productRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const orderRoutes = require('./routes/orderRoutes.js');
const uploadRoutes = require('./routes/uploadRoutes.js');
const authRoutes = require('./routes/authRoutes.js');
const { notFound, erroHandler } = require('./middleware/errorMiddleware.js');

connectDB();

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.set('trust proxy', 1);
}

// Sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET_PROSHOP,
    resave: false,
    saveUninitialized: false,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/auth', authRoutes);

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID_PROSHOP)
);

app.use('/uploads', express.static(path.join(__dirname, './uploads')));

// if (process.env.NODE_ENV !== 'production') {
//   app.use(express.static(path.join(__dirname, '/frontend/build')));

//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
//   });
// } else {
//   app.get('/', (req, res) => {
//     res.send('API is running');
//   });
// }

app.get('/', (req, res) => {
  res.send('API is running');
});

app.use(notFound);

app.use(erroHandler);

const PORT = process.env.PORT_PROSHOP || 5000;

app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
