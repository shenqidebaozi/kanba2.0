'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // kanba api 1.0
  router.get('/api/v1/reg',controller.v1.reg);
  router.get('/api/v1/login',controller.v1.login);
};
