import React from 'react';
import { Row, Col, Divider, Input } from 'antd';
import Upload from '../../../../components/upload';
import {Trim} from "../../../../utils";
const { TextArea } = Input;

const m = {
  tigejiancha: '体格检查',
  xcg: '血常规',
  xdt: '心电图',
  ncg: '尿常规',
  ct: 'CT',
  dbcg: '大便常规',
  mri: 'MRI',
  xsh: '血生化',
  cs:'超声',
  x: 'X光片',
  orther: '其他',
}

class winfo extends React.Component{
  constructor(props){
    super(props);
  }

  imgList = (index)=> {
    if(index <= 10){
      let name = 'upload'+index;
      return this.refs[name].getList();
    }
  };
  getData = (()=>{
    const data = document.getElementsByClassName('zhTextW');
    let postData = {}, westernMedicines = [];
    postData.id = this.props.data.id;
    for(let i=0; i<data.length; i++) {
      if(data[i].getAttribute('data-name') !== 'tigejiancha') {
        westernMedicines.push({
          text: Trim(data[i].value),
          name: data[i].getAttribute('data-name'),
          img: this.imgList(Number(i)),
          id: this.props.data[data[i].getAttribute('data-name')].id
        })
      }else {
        postData[data[i].getAttribute('data-name')] = Trim(data[i].value);
      }
    }
    postData.westernMedicines = westernMedicines;
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
                  it === 'tigejiancha'?'':<Upload ref={'upload'+i} imgListD={this.props.data[it].img}/>
                }
                {typeof this.props.data[it] != 'string'
                  ?
                  <TextArea rows={2} style={{'resize': 'none'}} className='zhTextW' data-name={it} defaultValue={this.props.data[it].text}/>
                  :
                  <TextArea rows={2} style={{'resize': 'none'}} className='zhTextW' data-name={it} defaultValue={this.props.data[it]}/>
                }
              </Col>
            )
          })
        }
      </Row>
    )
  }
}

export default winfo;
