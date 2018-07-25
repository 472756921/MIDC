//拼接get方法参数
// @data 参数（必须是对象）
export const getParmas = (url, data) => {
  let sendUrl = url;
  let i = 0;
  for (let it in data){
    if(i === 0){
      sendUrl+='?'+it+'='+data[it];
    }else {
      sendUrl+='&'+it+'='+data[it];
    }
    i++;
  }
  return sendUrl;
}
export const Trim = (m) => {
  return m.replace(/\s|\xA0/g,"");
}
export const DateFormate = (date, format) => {
  let o = {
    "M+" : date.getMonth()+1,                 //月份
    "d+" : date.getDate(),                    //日
    "h+" : date.getHours(),                   //小时
    "m+" : date.getMinutes(),                 //分
    "s+" : date.getSeconds(),                 //秒
    "q+" : Math.floor((date.getMonth()+3)/3), //季度
    "S"  : date.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(format)) {
    format=format.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
  }
  for(var k in o) {
    if(new RegExp("("+ k +")").test(format)){
      format = format.replace(RegExp.$1, (RegExp.$1.length===1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    }
  }
  return format;
}
export const isNumber = (val) =>{
  if(!/^\d+$/.test(val)){
    return false;
  } else {
    return true;
  }
}
export const isType = (data) => {
  return Object.prototype.toString.call(data);
}
//文件下载 -----------------
export const downloadFile = (fileName, url) => {
  if (isIE()) {
    ieDown(url)
  } else {
    const aLink = document.createElement('a');
    const evt = document.createEvent('MouseEvents');
    // var evt = document.createEvent("HTMLEvents")
    evt.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    aLink.download = fileName;
    aLink.href = url;
    aLink.dispatchEvent(evt)
  }
};

const ieDown = url => {
  window.open(url)
};

const isIE = () => {
  const explorer = window.navigator.userAgent;
  return explorer.indexOf('MSIE') >= 0 || explorer.indexOf('Trident/7.0') >= 0 || explorer.indexOf('Edge') >= 0;
};
//文件下载 -----------------
