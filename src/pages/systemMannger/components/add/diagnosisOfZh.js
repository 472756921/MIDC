import React from 'react';
import { Row, Col, Divider, Input, Select } from 'antd';
import Upload from '../../../../components/upload';
import {getParmas, Trim} from "../../../../utils";
import {api} from "../../../../utils/config";
const { TextArea } = Input;
const Option = Select.Option;
let _this = '';
const m = {
  ask: {
    name: '问诊',
    zusu: {name: '主诉'},
    xianbingshi: {name: '现病史'},
    jiwangshi: {name: '既往史'},
    guomingshi: {name: '过敏史'},
    hunyushi: {name: '婚育史'},
    gerenshi: {name: '个人史'},
    jiazhushi: {name: '家族史'},
  },
  look: {
    name: '望诊',
    sehz: {name: '舌诊'},
    shensexingtai: {name: '神色形态'},
    xiongfu: {name: '胸腹'},
    yaobeishizhizhuajia: {name: '腰背四肢爪甲'},
    pifimaofa: {name: '皮肤毛发'},
    toumainwuguanjinxiang: {name: '头面五官颈项'},
    qinahoueryinjipaixiewu: {name: '前后二阴及排泄物'},
    shezhenimg: {name: '舌诊图片'},
  },
  wq: {
    name: '闻切诊',
    maizhen: {name: '脉诊'},
    wenzhen: {name: '闻诊'},
    qita: {name: '其他'},
  },
  zhaiyao: {
    name: '四诊摘要',
    zhenzhuang: {name: '症状'},
    shezheng: {name: '舌诊'},
    maizhenSel: {name: '脉诊'},
  },
};

function selectData(type) {
  let _type = '';
  switch(type){
    case 'zhenzhuang':
      _type = 'zz';
      break;
    case 'shezheng':
      _type = 'sz';
      break;
    case 'maizhenSel':
      _type = 'mz';
      break;
  }
  var xmlhttp;
  if (window.XMLHttpRequest)  {
    xmlhttp=new XMLHttpRequest();
  }
  xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
      _this.setState({selectData: JSON.parse(xmlhttp.responseText)})
    }
  }
  let url = getParmas( api.getSLData, {type: _type});
  xmlhttp.open("GET", url ,true);
  xmlhttp.send();
}

class info extends React.Component{
  constructor(props, context){
    super(props, context);
    this.state={
      selectData: [],
    }
    _this = this;
  }

  imgList = ()=> this.refs.upload.getList();
  getData = (()=>{
    const data = document.getElementsByClassName('zhTextZ');
    let postData = {};
    postData.id = this.props.data.id;
    for(let i=0; i<data.length; i++) {
      if(data[i].getAttribute('data-name') === 'shezhenimg') {
        postData[data[i].getAttribute('data-name')] = {
          text: Trim(data[i].value),
          img: this.imgList(),
          id: this.props.data.look.shezhenimg.id,
        }
      }else {
        if(data[i].getAttribute('data-name')) {
          postData[data[i].getAttribute('data-name')] = Trim(data[i].value);
        } else {
          const name = data[i].className.split(' ')[1];
          let sd = data[i].children[0].children[0].children[0].getElementsByClassName("ant-select-selection__choice"); //选中的项（总数）
          let d = [];
          for(let ii=0; ii<sd.length; ii++){
            d.push(sd[ii].getAttribute('title'))
          }
          postData[name] = d;
        }
      }
    }
    return postData;
  })

  render(){
    return(
      <div id='areaya'>
        {
          Object.keys(m).map( (it, i) => {
            let temp = m[it], tempV = this.props.data[it];
            return (
              <Row gutter={16} key={i} key={i}>
                <Col span={24}>
                  <Divider orientation="left" style={{fontSize:'14px', marginTop:'20px', color:'#1890ff'}}>{m[it].name}</Divider>
                </Col>
                {
                  Object.keys(temp).map((itt, j) => {
                    if(j>0){
                      if((temp[itt].name == '症状' || temp[itt].name == '舌诊' || temp[itt].name == '脉诊') && m[it].name == '四诊摘要' ){
                        return (
                          <Col span={12} key={i*10+j}>
                            {temp[itt].name}:
                            <Select style={{ width: '100%' }} mode="multiple" title={itt}
                                    defaultValue={tempV[itt]===''?[]:tempV[itt].split(',')}
                                    className={['zhTextZ', itt].join(' ')} data-name={itt} onFocus={()=>selectData(itt)}
                                    getPopupContainer={() => document.getElementById('areaya')}>
                              {
                                _this.state.selectData.map((it, i) => {
                                  if(it.isMenu){
                                  } else {
                                    return (<Option key={i} value={it.name}>{it.name}</Option>)
                                  }
                                })
                              }
                            </Select>
                          </Col>
                        )
                      }  else {
                        return (
                          <Col span={temp[itt].name === '舌诊图片'?24:12} key={i*10+j}>
                            {temp[itt].name}:
                            {
                              temp[itt].name === '舌诊图片'?<Upload ref='upload' imgListD={tempV[itt].img}/>:''
                            }
                            {typeof tempV[itt] != 'string'
                              ?
                              <TextArea rows={2} style={{'resize': 'none'}} className='zhTextZ' data-name={itt} defaultValue={tempV[itt].text}/>
                              :
                              <TextArea rows={2} style={{'resize': 'none'}} className='zhTextZ' data-name={itt} defaultValue={tempV[itt]}/>
                            }
                          </Col>
                        )
                      }
                    } else {
                      return ''
                    }
                  })
                }
              </Row>
            )
          })
        }
      </div>
    )
  }
}


export default info;
