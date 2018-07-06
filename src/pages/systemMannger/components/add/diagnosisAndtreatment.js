import React from 'react';
import {Trim} from "../../../../utils";
import { Row, Col, Divider, Input, Select, Button, Icon } from 'antd';
const { TextArea } = Input;
const Option = Select.Option;

let _this;
const m = {
  zdyzl:{
    name: '诊断与治法',
    zyjb: {name: '中医疾病'},
    xyjb: {name: '西医疾病'},
    zyzh: {name: '中医证候'},
    zzzf: {name: '治则治法'},
  },
  cf:{
    name: '处方',
    zycf: {
      name: '中药处方',
      zfm: {name: '处方名称'},
      type: {name: '处方类型'},
      number: {name: '处方剂数'},
      doctor: {name: '处方医师'},
      // medicine: {name: '处方详情'},
    },
    orther: {
      name: '其他治疗',
      medicineC: {name: '中成药'},
      medicineW: {name: '西成药'},
      orther: {name: '其他'},
    },
  },
};

class info extends React.Component{
  constructor(props){
    super(props);
    this.state={
      midL: [],
    }
    _this = this;
  }

  componentDidMount() {
    let m = [];
    if(this.props.data.cf.zycf.medicine) {
      m = this.props.data.cf.zycf.medicine.map((it, i) => {
        let midc = this.createdMid(it);
        return midc;
      })
    }
    this.setState({...this.state, midL: m})
  }
  getData = (()=>{
    const data = document.getElementsByClassName('zhTextA');
    let postData = {};
    for(let i=0; i<data.length; i++) {
      postData[data[i].getAttribute('data-name')] = Trim(data[i].value);
    }
    let midName = document.getElementsByClassName('midName');
    let midNum = document.getElementsByClassName('midNum');
    let midOption = document.getElementsByClassName('midOption');
    let midType = document.getElementsByClassName('midType');
    let medicine = [];
    for(let i=0; i<midName.length; i++) {
      medicine.push({
        name: Trim(midName[i].children[0].children[0].children[0].innerText),
        liang: Trim(midNum[i].value),
        zhuyong: Trim(midOption[i].children[0].children[0].children[0].innerText),
        yongfa: Trim(midType[i].children[0].children[0].children[0].innerText),
      })
    }
    postData.medicine = medicine;
    return postData;
  });
  createdMid(data) {
    let key = parseInt(Math.random()*100000);
    let mid =  <Col span={24} style={{margin: '6px 0'}} key={key}>
      <Col span={6}>
        <Select style={{ width: 150 }} showSearch className='midName' defaultValue={data?data.name:''}>
          <Option value="丹参">丹参</Option>
          <Option value="西红花">西红花</Option>
          <Option value="玉米须">玉米须</Option>
          <Option value="木棉花">木棉花</Option>
          <Option value="合欢花">合欢花</Option>
          <Option value="木槿花">木槿花</Option>
          <Option value="盘龙参">盘龙参</Option>
          <Option value="颠茄草">颠茄草</Option>
          <Option value="醉鱼草">醉鱼草</Option>
          <Option value="蒲公英">蒲公英</Option>
          <Option value="蔊菜">蔊菜</Option>
        </Select>
      </Col>
      <Col span={6}><Input placeholder="用量" style={{width: 50}}  className='midNum' defaultValue={data?data.liang:''}/> g</Col>
      <Col span={6}>
        <Select defaultValue="君" style={{ width: 100 }} className='midOption' defaultValue={data?data.zhuyong:''}>
          <Option value="君">君</Option>
          <Option value="臣">臣</Option>
          <Option value="佐">佐</Option>
          <Option value="使">使</Option>
          <Option value="其他">其他</Option>
        </Select>
      </Col>
      <Col span={4}>
        <Select defaultValue="先煎" style={{ width: 100 }}  className='midType' defaultValue={data?data.yongfa:''}>
          <Option value="先煎">先煎</Option>
          <Option value="后下">后下</Option>
          <Option value="包煎">包煎</Option>
          <Option value="捣碎">捣碎</Option>
          <Option value="烊化">烊化</Option>
        </Select>
      </Col>
      <Col span={2}>
        <Icon type="minus-circle" style={{color: 'red', cursor: 'pointer'}} onClick={()=>_this.delItem(key)}/>
      </Col>
    </Col>
    return {
      t: mid,
      key: key
    };
  }
  addMid = () =>{
    let temp = _this.state.midL.concat([_this.createdMid()]);
    _this.setState({
      midL: temp
    });
  };
  delItem = (key) => {
    _this.state.midL.map((it, index) => {
      if(it.key === key ) {
        _this.state.midL.splice(index, 1);
        _this.setState({
          ..._this.state
        });
      }
      return ''
    })
  };

  render() {
    return(
      <div>
        {
          Object.keys(m).map((it, i)=>{
            let temp = m[it], tempV = this.props.data[it];
            if(it !== 'cf'){
              let t = (
                <Col span={24}  key={i}>
                  <Divider orientation="left" style={{fontSize:'14px', marginTop:'20px', color:'#1890ff'}}>{m[it].name}</Divider>
                </Col>
              )
              let c = Object.keys(temp).map((iit, ii) => {
                if(ii>0) {
                  return (
                    <Col span={12} key={i * 10 + ii}>
                      {temp[iit].name}:
                      <TextArea rows={2} style={{'resize': 'none'}} className='zhTextA' data-name={iit} defaultValue={tempV[iit]}/>
                    </Col>
                  )
                } else {
                  return ''
                }
              })
              return (
                <Row gutter={16} key={i}>
                  {t}
                  {c}
                </Row>
              )
            } else {
              return ''
            }
          })
        }
        <Row gutter={16}>
          <Col span={24}>
            <Divider orientation="left" style={{fontSize:'14px', marginTop:'20px', color:'#1890ff'}}>处方</Divider>
          </Col>
          <Col span={24}>
            <Divider dashed orientation="left" style={{fontSize:'14px', color:'#1890ff'}}>中药处方</Divider>
          </Col>
          {
            Object.keys(m.cf.zycf).map((it, i)=>{
              let tempv = this.props.data.cf.zycf[it];
              if(i !== 0) {
                return (
                  <Col span={12} style={{margin: '5px 0'}} key={i}>
                    {m.cf.zycf[it].name}:
                    <Input placeholder={m.cf.zycf[it].name} data-name={it} className='zhTextA' defaultValue={tempv}/>
                  </Col>
                )
              } else {
                return ''
              }
            })
          }
          <Col span={6} style={{marginTop: '10px'}}>中药名</Col>
          <Col span={6} style={{marginTop: '10px'}}>用量</Col>
          <Col span={6} style={{marginTop: '10px'}}>作用</Col>
          <Col span={6} style={{marginTop: '10px'}}>用法</Col>
          {
            this.state.midL.map((it)=>{
              return it.t;
            })
          }
          <Col span={24}>
            <Button type="primary" icon="plus-circle" style={{width: '100%', margin: '10px'}} onClick={()=>{this.addMid()}}>加添药材</Button>
          </Col>

          <Col span={24}>
            <Divider dashed orientation="left" style={{fontSize:'14px', color:'#1890ff'}}>其他处方</Divider>
          </Col>
          {
            Object.keys(m.cf.orther).map((it, i)=>{
              if(i !== 0){
                let tempv = this.props.data.cf.orther[it];
                return(
                  <Col span={8} key={i}>
                    {m.cf.orther[it].name}:
                    <TextArea rows={2} style={{'resize': 'none'}} className='zhTextA' data-name={it} defaultValue={tempv}/>
                  </Col>
                )
              } else {
                return ''
              }
            })
          }
        </Row>
      </div>
    )
  }
}


export default info;
