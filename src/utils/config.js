const api_M = '/apiM'
const serviceIP = 'http://192.168.0.104:8080'
const apiOnline = serviceIP + '/apiM'

module.exports = {
  serviceIP: serviceIP,
  name: '中医传承辅助系统',
  footerText: ' Admin © 2018 优医汇 - Benson',
  logo: '',
  openPages: ['/login', '/404'],
  api: {
    uploadImg: apiOnline + '/upload/uploadImg',
    uploadFile: apiOnline + '/upload/uploadFile',
    downloadFlie: apiOnline + '/upload/download',
    getUser: api_M + '/user/getUser',
    login: api_M + '/user/login',
    loginOut: api_M + '/user/loginOut',
    //信息采集
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
    saveCdData: apiOnline + '/platform/addDictionary',
    delCdData: apiOnline + '/platform/deleteDictionary',
    saveData: apiOnline + '/platform/save',
    del: apiOnline + '/platform/delete',
    saveYa : apiOnline + '/platform/save/patiend',
    //资料管理
    dataList: apiOnline + '/datum/find',
    addData: apiOnline + '/datum/save',
    delData: apiOnline + '/datum/delete',
    //
    searchData: api_M + '/k/searchData',
  }
}
