import Mock from 'MockJS';
const qs = require('qs');

const adminUser = [
  { userName: 'admin', password: 'admin', head: 'XXX', permissions: 'admin', id: 123 },
  { userName: 'guest', password: 'guest', head: 'XXX', permissions: 'guest', id: 223 },
  { userName: 'dev', password: 'dev', head: 'XXX', permissions: 'dev', id: 323 },
];

let Dashboard =  {
  'POST /apiM/user/login': (req, res) => {
    const { userName, password } =eval(req.body)
    const user = adminUser.filter(item => item.userName === userName);
    setTimeout(()=>{
      if(user.length > 0 && user[0].password === password) {
        const now = new Date()
        now.setDate(now.getDate() + 1)
        res.cookie('token', JSON.stringify({ id: user[0].id, deadline: now.getTime() }), {
          maxAge: 1000 * 60 * 30,
          httpOnly: true,
        })
        res.send(user[0]);
      } else {
        res.status(400).end()
      }
    }, 1000)
  },

  'GET /apiM/user/getUser': (req, res) => {
    const cookie = req.headers.cookie || '';
    const cookies = qs.parse(cookie.replace(/\s/g, ''), { delimiter: ';' })
    const response = {};
    const user = {};
    if (!cookies.token) {
      res.status(200).send({ message: 'Not Login' })
      return
    }
    const token = JSON.parse(cookies.token)
    if (token) {
      response.success = token.deadline > new Date().getTime()
    }
    if (response.success) {
      const userItem = adminUser.filter(_ => _.id === token.id)
      if (userItem.length > 0) {
        user.permissions = userItem[0].permissions
        user.username = userItem[0].userName
        user.id = userItem[0].id
      }
    }
    response.user = user
    res.json(response)
  }
};

module.exports = Dashboard;
