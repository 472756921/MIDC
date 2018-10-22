const api_M = '/apiM'
const serviceIP = 'http://192.168.0.108:8088'  //测试
// const serviceIP = 'http://116.62.201.135'  //生产
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
    getUser: apiOnline + '/user/getUser',
    login: apiOnline + '/user/login',
    loginOut: apiOnline + '/user/logout',
    //信息采集
    patientList: apiOnline + '/patient/list',
    queryPatient: apiOnline + '/patient/info',
    addRec: apiOnline + '/patient/addRec',
    addPatient: apiOnline + '/patient/add',
    setYiyan: apiOnline + '/patient/setYiyan',
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
    //知识检索-药材查询
    searchData: apiOnline + '/knowledge/getListData',
    //知识检索-医案查询
    searchData2: apiOnline + '/knowledge/getYiAnData',
    //知识检索-方剂查询
    searchData3: apiOnline + '/knowledge/getFjData',
    //用户管理
    userList: apiOnline + '/user/findAll',
    userSave: apiOnline + '/user/save',
    userDel: apiOnline + '/user/delete',
    // 统计报表
    report: api_M + '/report/data',
  }
}
