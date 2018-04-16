

'use strict';
const Service = require('egg').Service;
const md5 = require('md5');
class UserService extends Service {
  // 默认不需要提供构造函数。
  // constructor(ctx) {
  //   super(ctx); 如果需要在构造函数做一些处理，一定要有这句话，才能保证后面 `this.ctx`的使用。
  //   // 就可以直接通过 this.ctx 获取 ctx 了
  //   // 还可以直接通过 this.app 获取 app 了
  // }
  async reg(user) {
  // 注册方法
    const post = await this.app.mysql.get('users', {
      username: user.username,
    });
    if (post === null) {
      const post = await this.app.mysql.get('users', {
        qq: user.qq,
      });
      if (post === null) {
        const result = await this.app.mysql.insert('users', user);
        console.log(result);
        const insertSuccess = result.affectedRows;
        if (insertSuccess === 1) {
          return '{code:200,msg:\'注册成功\'}';
        }
        return '{code:401,msg:\'注册失败\'}';

      }
      return '{code:402,msg:\'注册失败，QQ号码已经被绑定\'}';

    }
    return '{code:403,msg:\'注册失败,用户名已经被使用\'}';


  }
  async login(user) {
    if (user.token !== null) {
      const result3 = await this.app.mysql.get('users', { token: user.token });
      if (result3 !== null) {
        const md5token1 = md5(Date.now() + result3.password);
        console.log(md5token1);
        const row = {
          id: result3.id,
          token: md5token1,
        };
        const result4 = await this.app.mysql.update('users', row);

        const insertSuccess2 = result4.affectedRows;
        if (insertSuccess2 === 1) {
          return '{code:200,msg:\'登陆成功\',user:{' + 'nickname:\'' + new Buffer(result3.nickname).toString('base64') + '\'' + ',qq:\'' + result3.qq + '\'' + ',sex:\'' + result3.sex + '\'' + ',gx:\'' + result3.gx + '\'' + ',age:\'' + result3.age + '\'' + ',token:\'' + md5token1 + '\'' + ',money:\'' + result3.money + '\'' + '}}';
        }
        return '{code:405,msg:\'登录失败\'}';
      }
    }

    const result1 = await this.app.mysql.get('users', { username: user.username, password: user.password });
    if (result1 === null) {
      return '{code:404,msg:\'登陆失败,用户名或密码错误\'}';
    }
    console.log(result1);
    const md5token = md5(Date.now() + result1.password);
    console.log(md5token);
    const row = {
      id: result1.id,
      token: md5token,
    };
    const result2 = await this.app.mysql.update('users', row);
    console.log(result2);
    const insertSuccess1 = result2.affectedRows;
    if (insertSuccess1 === 1) {
      return '{code:200,msg:\'登陆成功\',user:{' + 'nickname:\'' + new Buffer(result1.nickname).toString('base64') + '\'' + ',qq:\'' + result1.qq + '\'' + ',sex:\'' + result1.sex + '\'' + ',gx:\'' + result1.gx + '\'' + ',age:\'' + result1.age + '\'' + ',token:\'' + result1.token + '\'' + ',money:\'' + result1.money + '\'' + '}}';
    }
    return '{code:405,msg:\'登录失败\'}';
  }
}
module.exports = UserService;
