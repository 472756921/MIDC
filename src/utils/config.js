const api_M = '/apiM'
const apiOnline = 'http://192.168.0.115:8080/apiM'

module.exports = {
  name: '中医传承辅助系统',
  footerText: ' Admin © 2018 Benson',
  logo: '',
  openPages: ['/login', '/404'],
  api: {
    getUser: api_M + '/user/getUser',
    login: api_M + '/user/login',
    loginOut: api_M + '/user/loginOut',
    patientList: apiOnline + '/patient/list',
    queryPatient: apiOnline + '/patient/info',
    addRec: apiOnline + '/patient/addRec',
    addPatient: apiOnline + '/patient/add',
    getSLData: api_M + '/sys/getListData',
    getSLITData: api_M + '/sys/getSLITData',
    saveData: api_M + '/sys/saveData',
    del: api_M + '/sys/del',
    search: api_M + '/sys/search',
    uploadImg: apiOnline + '/upload/uploadImg',
  }
}
