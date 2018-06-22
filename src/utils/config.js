const api_M = '/apiM'

module.exports = {
  name: '中医传承辅助系统',
  footerText: ' Admin © 2018 Benson',
  logo: '',
  openPages: ['/login', '/404'],
  api: {
    getUser: api_M + '/user/getUser',
    login: api_M + '/user/login',
    loginOut: api_M + '/user/loginOut',
    patientList: api_M + '/patient/list',
    queryPatient: api_M + '/patient/info',
    addPatient: api_M + '/patient/add',
    getSLData: api_M + '/sys/getListData',
  }
}
