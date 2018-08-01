import React from 'react';
import {Trim, getParmas} from "../../../../utils";
import { Row, Col, Divider, Input, Select, Button, Icon } from 'antd';
import {api} from "../../../../utils/config";
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


function selectDataf(type) {
  let _type = '';
  switch(type){
    case 'zyjb':
      _type = 'cdm';
      break;
    case 'xyjb':
      _type = 'wdm';
      break;
    case 'zyzh':
      _type = 'zh';
      break;
    case 'zzzf':
      _type = 'zzzf';
      break;
    case 'zy':
      _type = 'zy';
      break;
  }

  var xmlhttp;
  if (window.XMLHttpRequest)  {
    xmlhttp=new XMLHttpRequest();
  }
  xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
      if(type === 'zy'){
        _this.setState({..._this.state, mdls: JSON.parse(xmlhttp.responseText)})
      } else if(type == 'zyyf') {
        _this.setState({..._this.state, midType: JSON.parse(xmlhttp.responseText)})
      } else if(type == 'zyzz') {
        _this.setState({..._this.state, midOption: JSON.parse(xmlhttp.responseText)})
      } else {
        _this.setState({..._this.state, selectData: JSON.parse(xmlhttp.responseText)})
      }
    }
  }
  let url = '';
  if(type == 'zyyf' || type == 'zyzz') {
    //平台类查询
    url = getParmas( api.getCdData, {sysType: type});
  } else {
    //词典查询
    url = getParmas( api.getSLData, {type: _type});
  }
  xmlhttp.open("GET", url ,true);
  xmlhttp.send();
}


class info extends React.Component{
  constructor(props){
    super(props);
    this.state={
      midL: [],
      selectData:[],
      mdls:[],
      midOption:[],
      midType:[],
    }
    _this = this;
    selectDataf('zy');
    selectDataf('zyzz');
    selectDataf('zyyf');
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
          {
            this.state.mdls.map((it, i) => {
              if(it.isMenu){
              } else {
                return (<Option key={i} value={it.name}>{it.name}</Option>)
              }
            })
          }
        </Select>
      </Col>
      <Col span={6}><Input placeholder="用量" style={{width: 50}}  className='midNum' defaultValue={data?data.liang:''}/> g</Col>
      <Col span={6}>
        <Select style={{ width: 100 }} className='midOption' defaultValue={data?data.zhuyong:''}>
          {
            this.state.midOption.map((it, i) => {
              return (<Option key={i} value={it.name}>{it.name}</Option>)
            })
          }
        </Select>
      </Col>
      <Col span={4}>
        <Select style={{ width: 100 }} className='midType' defaultValue={data?data.yongfa:''}>
          {
            this.state.midType.map((it, i) => {
              return (<Option key={i} value={it.name}>{it.name}</Option>)
            })
          }
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
      <div id='area3'>
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
                      <Select style={{ width: '100%' }} mode="multiple" title={iit}
                              defaultValue={tempV[iit]===''?[]:tempV[iit].split(',')}
                              className={['zhTextA', iit].join(' ')} data-name={iit} onFocus={()=>selectDataf(iit)}
                              getPopupContainer={() => document.getElementById('area3')}>
                        {
                          this.state.selectData.map((it, i) => {
                            if(it.isMenu){
                            } else {
                              return (<Option key={i} value={it.name}>{it.name}</Option>)
                            }
                          })
                        }
                      </Select>
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
