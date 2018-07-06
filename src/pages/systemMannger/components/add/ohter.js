import React from 'react';
import { Row, Col, Divider, Input, Select } from 'antd';
import {Trim} from "../../../../utils";
const { TextArea } = Input;
const { Option } = Select;
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
  constructor(props){
    super(props);
  }
  getData = (()=>{
    const data = document.getElementsByClassName('zhTextO');
    let postData = {};
    for(let i = 2; i<data.length; i++) {
      postData[data[i].getAttribute('data-name')] = Trim(data[i].value);
    }
    postData.zylxpj = data[0].children[0].children[0].children[0].innerText;
    postData.xylxpj = data[1].children[0].children[0].children[0].innerText;
    return postData;
  })
  render(){
    return(
      <div>
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
                    if(j>0) {
                      return (
                        <Col span={12} key={i * 10 + j}>
                          {temp[itt].name}:
                          {itt === 'zylxpj' || itt === 'xylxpj'
                            ?
                            <Select className='zhTextO' disabled data-name={itt} defaultValue={tempV[itt]} style={{
                              width: '100px',
                              height: '30px',
                              marginLeft: '10px'
                            }}>
                              <Option value='恶化'>恶化</Option>
                              <Option value='无效'>无效</Option>
                              <Option value='有效'>有效</Option>
                              <Option value='显效'>显效</Option>
                              <Option value='痊愈'>痊愈</Option>
                            </Select>
                            :
                            <TextArea rows={2} style={{'resize': 'none'}} className='zhTextO' data-name={itt} defaultValue={tempV[itt]}/>}

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
