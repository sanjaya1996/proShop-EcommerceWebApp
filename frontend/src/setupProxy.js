const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(createProxyMiddleware('/api', { target: 'http://localhost:5000' }));
  app.use(
    createProxyMiddleware('/uploads', { target: 'http://localhost:5000' })
  );
};
