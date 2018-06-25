import React from 'react';
import { Row, Col, Divider, Input } from 'antd';
import Upload from '../../../../../components/upload';
import {Trim} from "../../../../../utils";
const { TextArea } = Input;

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
    maizhen: {name: '脉诊'},
  },
};


class info extends React.Component{
  imgList = ()=> this.refs.upload.getList();
  getData = (()=>{
    const data = document.getElementsByClassName('zhTextZ');
    let postData = {};
    for(let i=0; i<data.length; i++) {
      if(data[i].getAttribute('data-name') === 'shezhenimg') {
        postData[data[i].getAttribute('data-name')] = {
          text: Trim(data[i].value),
          img: this.imgList()
        }
      }else {
        postData[data[i].getAttribute('data-name')] = Trim(data[i].value);
      }
    }
    return postData;
  })

  render(){
    return(
      <div>
        {
          Object.keys(m).map( (it, i) => {
            let temp = m[it];
            return (
              <Row gutter={16} key={i} key={i}>
                <Col span={24}>
                  <Divider orientation="left" style={{fontSize:'14px', marginTop:'20px', color:'#1890ff'}}>{m[it].name}</Divider>
                </Col>
                {
                  Object.keys(temp).map((itt, j) => {
                    if(j>0){
                      return (
                        <Col span={temp[itt].name === '舌诊图片'?24:12} key={i*10+j}>
                          {temp[itt].name}:
                          {
                            temp[itt].name === '舌诊图片'?<Upload ref='upload'/>:''
                          }
                          <TextArea rows={2} style={{'resize': 'none'}} className='zhTextZ' data-name={itt}/>
                        </Col>
                      )
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
