import React from 'react';
import { Row, Col, Divider, Input } from 'antd';
import Upload from '../../../../../components/upload';
import {Trim} from "../../../../../utils";
import styles from './styles.css';
const { TextArea } = Input;

const m = {
  tigejiancha: '体格检查',
  xcg: '血常规',
  xdt: '心电图',
  ncg: '尿常规',
  CT: 'CT',
  dbcg: '大便常规',
  MRI: 'MRI',
  xsh: '血生化',
  cs:'超声',
  X: 'X光片',
  orther: '其他',
}

class winfo extends React.Component{
  imgList = ()=> this.refs.upload.getList();
  getData = (()=>{
    const data = document.getElementsByClassName('zhTextW');
    let postData = {};
    for(let i=0; i<data.length; i++) {
      if(data[i].getAttribute('data-name') != 'tigejiancha') {
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

  render() {
    return (
      <Row gutter={16}>
        {
          Object.keys(m).map((it, i)=>{
            return (
              <Col span={24} key={i}>
                <Divider orientation="left" style={{fontSize:'14px', marginTop:'20px', color:'#1890ff'}}>{m[it]}</Divider>
                {
                  it == 'tigejiancha'?'':<Upload ref='upload'/>
                }
                <TextArea rows={2} style={{'resize': 'none'}} className='zhTextW' data-name={it}/>

              </Col>
            )
          })
        }
      </Row>
    )
  }
}

export default winfo;
