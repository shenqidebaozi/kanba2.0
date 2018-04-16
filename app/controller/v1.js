'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async reg() {
    console.log(this.ctx.query);
    const user = this.ctx.query;
    const zt = await this.ctx.service.v1.reg(user);
    this.ctx.body = zt;
  }
  async login() {
    this.ctx.body = '';
    const user = this.ctx.query;
    const zt = await this.ctx.service.v1.login(user);
    this.ctx.body = zt;
  }
}

module.exports = HomeController;
