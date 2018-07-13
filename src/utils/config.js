const api_M = '/apiM'
const apiOnline = 'http://192.168.0.104:8080/apiM'

module.exports = {
  name: '中医传承辅助系统',
  footerText: ' Admin © 2018 Benson',
  logo: '',
  openPages: ['/login', '/404'],
  api: {
    //信息采集
    getUser: api_M + '/user/getUser',
    login: api_M + '/user/login',
    loginOut: api_M + '/user/loginOut',
    patientList: apiOnline + '/patient/list',
    queryPatient: apiOnline + '/patient/info',
    addRec: apiOnline + '/patient/addRec',
    addPatient: apiOnline + '/patient/add',
    //平台管理
    getSLData: apiOnline + '/platform/getListData',
    getCFData: apiOnline + '/platform/findComponentByName',
    saveCFData: apiOnline + '/platform/saveComponentManager',
    delCFData: apiOnline + '/platform/deleteComponentManagerById',
    getYaData: apiOnline + '/platform/findPatiendAll',
    getCdData: apiOnline + '/platform/findDictionary',
    getSLITData: api_M + '/sys/getSLITData',
    saveData: apiOnline + '/platform/save',
    del: apiOnline + '/platform/delete',
    search: api_M + '/sys/search',
    uploadImg: apiOnline + '/upload/uploadImg',
  }
}
