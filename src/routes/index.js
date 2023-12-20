const newsRouter = require('./news');
// const siteRouter = require('./site');
const tutorialRouter = require('./tutorial');
const categoriesRouter = require('./category');
const customerRouter = require('./customer');
const cartRouter = require('./cart');
const deliveryRouter = require('./delivery');
const productRouter = require('./product');
const settingRouter = require('./setting');

function route(app) {
  app.use('/news', newsRouter);
  app.use('/searhCustomer',tutorialRouter);
  app.use('/category',categoriesRouter);
  app.use('/customer', customerRouter);
  app.use('/cart', cartRouter);
  app.use('/delivery', deliveryRouter);
  app.use('/product', productRouter);
  app.use('/setting', settingRouter);
}
module.exports = route;
