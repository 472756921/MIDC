import Mock from 'MockJS';
const qs = require('qs');

let patientList = Mock.mock({
  'data|100-300': [
    {
      id: '@id',
      key: '@id',
      name: '@cname',
      date: '@date("yyyy-MM-dd HH:mm")',
      sex: '@cword("男女")',
      phone: '1' + '@cword("37", 1, 1)' + '@cword("1234567890", 9, 9)',
      address: '@county(true)',
      age: '@natural(16, 80)',
      time: '@natural(1, 20)',
    },
  ],
})

let patient = {
  'GET /apiM/patient/list': (req, res) => {
    let {query} = req;
    let v = query.searchV;
    let nd = patientList.data;
    if(v != '') {
      nd = patientList.data.filter(item => item.name.indexOf(v)!=-1);
    }
    let bd = nd.slice((query.page-1)*query.pageSize, query.page*query.pageSize);
    let resData = {
      data: bd,
      total: nd.length,
      page: Number(query.page),
    }
    res.json(resData);
  },

  'POST /apiM/patient/add': (req, res) => {
    let {body} = req;
    res.json({msg: 'ok', id: '14836497910853'});
  },
  'GET /apiM/patient/info': (req, res) => {
    let {query} = req;
    let nd = patientList.data;
    let bd = nd.slice((query.page-1)*query.pageSize, query.page*query.pageSize);
    let resData ={
      info: {
        name: Mock.mock('@cname'),
        sex:  Mock.mock('@cword("男女")'),
        age:  Mock.mock('@natural(16, 80)'),
        weight:  Mock.mock('@natural(20, 80)'),
        marriage:  Mock.mock('@cword("已未")'),
        visitTimes:  Mock.mock('@natural(1, 20)'),
        profession:  Mock.mock('@csentence(3, 5)'),
        citizenship:  Mock.mock('@tld'),
        ethnic:  Mock.mock('@cword("汉满回壮苗藏")'),
        birthplace:  Mock.mock('@city'),
        phone:   '1' + Mock.mock('@cword("37", 1, 1)') + Mock.mock('@cword("1234567890", 9, 9)'),
        address:  Mock.mock('@county(true)'),
        zipCode:  Mock.mock('@zip()'),
      },
      historyData:  Mock.mock({
        'data|1-20':[{
          key: '@id',
          id: '@id',
          date: '@date("yyyy-MM-dd HH:mm")',
          visitTimes: '@natural(1, 20)',
          diagnosisOfZh: {
            ask: {
              zusu: '@csentence(20, 50)',
              xianbingshi: '@csentence(20, 50)',
              jiwangshi: '@csentence(20, 50)',
              guomingshi: '@csentence(20, 50)',
              hunyushi: '@csentence(20, 50)',
              gerenshi: '@csentence(20, 50)',
              jiazhushi: '@csentence(20, 50)',
            },
            look: {
              sehz: '@csentence(20, 50)',
              shensexingtai: '@csentence(20, 50)',
              xiongfu: '@csentence(20, 50)',
              yaobeishizhizhuajia: '@csentence(20, 50)',
              pifimaofa: '@csentence(20, 50)',
              toumainwuguanjinxiang: '@csentence(20, 50)',
              qinahoueryinjipaixiewu: '@csentence(20, 50)',
              shezhenimg: {
                'img|0-5':['@image("200x100")'],
                text: '@csentence(20, 50)'
              },
            },
            wq:{
              maizhen: '@csentence(20, 50)',
              wenzhen: '@csentence(20, 50)',
              qita: '@csentence(20, 50)',
            },
            zhaiyao: {
              zhenzhuang: '@csentence(5, 10)',
              shezheng: '@csentence(5, 10)',
              maizhen: '@csentence(5, 10)',
            }
          },
          diagnosisOfWe: {
            tigejiancha: '@csentence(20, 50)',
            xcg: {
              'img|0-5':['@image("200x100")'],
              text: '@csentence(20, 50)',
            },
            xdt: {
              'img|0-5':['@image("200x100")'],
              text: '@csentence(20, 50)',
            },
            ncg: {
              'img|0-5':['@image("200x100")'],
              text: '@csentence(20, 50)',
            },
            CT: {
              'img|0-5':['@image("200x100")'],
              text: '@csentence(20, 50)',
            },
            dbcg: {
              'img|0-5':['@image("200x100")'],
              text: '@csentence(20, 50)',
            },
            MRI: {
              'img|0-5':['@image("200x100")'],
              text: '@csentence(20, 50)',
            },
            xsh: {
              'img|0-5':['@image("200x100")'],
              text: '@csentence(20, 50)',
            },
            cs: {
              'img|0-5':['@image("200x100")'],
              text: '@csentence(20, 50)',
            },
            X: {
              'img|0-5':['@image("200x100")'],
              text: '@csentence(20, 50)',
            },
            orther: {
              'img|0-5':['@image("200x100")'],
              text: '@csentence(20, 50)',
            },
          },
          diagnosisAndtreatment: {
            zdyzl:{
              zyjb: '@csentence(20, 50)',
              xyjb: '@csentence(20, 50)',
              zyzh: '@csentence(20, 50)',
              zzzf: '@csentence(20, 50)',
            },
            cf:{
              zycf: {
                zfm: '@csentence(5, 8)',
                type: '@csentence(5, 8)',
                number: '@natural(1, 5)',
                doctor: '@cname',
                'medicine|1-20':[
                  {name: '@csentence(2, 3)', liang: '@natural(5, 30)', zhuyong: '@cword("君臣佐使")', yongfa: '@cword("煎炸烹卤")'}
                ],
              },
              orther: {
                medicineC: '@csentence(20, 50)',
                medicineW: '@csentence(20, 50)',
                orther: '@csentence(20, 50)',
              }
            }
          },
          orther: {
            zhiliaoxiaoguo: {
              zylxpj: '@csentence(20, 50)',
              xylxpj: '@csentence(20, 50)',
            },
            huifangjilu: {
              date: '@date("yyyy-MM-dd HH:mm")',
              huifangren: '@cname',
              huifangneirong: '@csentence(20, 50)',
              qita: '@csentence(20, 50)'
            },
            anyu:{
              lsdy: '@csentence(20, 50)',
              grxd: '@csentence(20, 50)',
              zjdp: '@csentence(20, 50)',
              qita: '@csentence(20, 50)'
            }
          },
          }]
      })

    }
    res.json(resData);
  },
}

module.exports = patient;
