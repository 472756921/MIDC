import Mock from 'MockJS';
const qs = require('qs');

let patientList = Mock.mock({
  'data|500-800': [
    {
      id: '@id',
      key: '@id',
      name: '@cname',
      ename: '@name',
      lname: '@name',
      bname: '@name',
      glzz: '@cname',
      xwgj: '@cname',
      jy: '@cname',
      gxlx: '@cname',
      xz: '@cname',
      yfyl: '@cname',
      ly: '@cname',
      yybw: '@cname',
    },
  ],
})

let patient = {
  'post /apiM/k/searchData': (req, res) => {
    let {query} = req;
    let nd = patientList.data;
    let bd = nd.slice((query.page-1)*query.pageSize, query.page*query.pageSize);
    res.json(patientList.data);
  },
}

module.exports = patient;
