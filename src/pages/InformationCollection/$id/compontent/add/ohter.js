import React from 'react';
import { Row, Col, Divider, Input } from 'antd';
import {Trim} from "../../../../../utils";
const { TextArea } = Input;

const m = {
  zhiliaoxiaoguo: {
    name: '治疗效果',
    zylxpj: {name: '中医疗效评价'},
    xylxpj: {name: '西医疗效评价'},
  },
  huifangjilu: {
    name: '回访记录',
    date: {name: '回访时间'},
    huifangren: {name: '回访人'},
    huifangneirong: {name: '回访内容'},
    qita: {name: '其他'},
  },
  anyu: {
    name: '按语',
    lsdy: {name: '老师答疑'},
    grxd: {name: '个人心得'},
    zjdp: {name: '专家点评'},
    qita: {name: '其他'},
  },
};
class info extends React.Component{
  getData = (()=>{
    const data = document.getElementsByClassName('zhTextO');
    let postData = {};
    for(let i=0; i<data.length; i++) {
      postData[data[i].getAttribute('data-name')] = Trim(data[i].value);
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
                    if(j>0)
                      return (
                        <Col span={12} key={i*10+j}>
                          {temp[itt].name}:
                          {itt == 'zylxpj' || itt == 'xylxpj'
                            ?
                            <select className='zhTextO' data-name={itt} style={{width: '100px',border:'1px solid #ccc',borderRadius: '5px', height: '30px',marginLeft: '10px'}}>
                              <option value='恶化'>恶化</option>
                              <option value='无效'>无效</option>
                              <option value='有效'>有效</option>
                              <option value='显效'>显效</option>
                              <option value='痊愈'>痊愈</option>
                            </select>
                            :
                            <TextArea rows={2} style={{'resize': 'none'}} className='zhTextO' data-name={itt}/>}

                        </Col>
                      )
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
