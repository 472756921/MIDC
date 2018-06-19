import React from 'react';
import { connect } from 'dva';
import { Tabs, Modal, Button } from 'antd';
import DiagnosisOfZh from './diagnosisOfZh';
import DiagnosisOfWe from './diagnosisOfWe';
import DagnosisAndtreatment from './diagnosisAndtreatment';
import OhterInfo from './ohter';

const TabPane = Tabs.TabPane;
let _this = '';
let dis = '';
class modalAdd extends React.Component{
  constructor(props){
    dis = props.dispatch;
    super(props);
    this.state={
      count: {1:'1'},
      btnDis: true,
    }
    _this = this;
  }

  handleAdd(){
    const zhd = _this.refs.zhD.getData();
    const wed = _this.refs.weD.getData();
    const arD = _this.refs.arD.getData();
    const orD = _this.refs.orD.getData();
    let postData = {
      diagnosisOfZh: zhd,
      diagnosisOfWe: wed,
      diagnosisAndtreatment: arD,
      orther: orD,
    }
    console.log(postData);
    dis({type: 'Idetail/addModelOp', payload:{f: false}});
  }
  handleCancel() {
    dis({type: 'Idetail/addModelOp',payload:{f: false}});
  }

  callback(key) {
    if(!_this.state.count[key]){
      _this.state.count[key] = '1';
    }
    let a = Object.keys(_this.state.count);
    if(a.length === 4){
      _this.setState({
        ..._this.state,
        btnDis: false
      })
    }
  }

  render(){
    return (
      <div>
        <Modal title="添加就诊记录" width='800px'  closable={false} visible={this.props.Idetail.addModel}
               footer={[<Button key="back" type="primary" onClick={this.handleAdd} disabled={this.state.btnDis} >添加</Button>,<Button key="close" onClick={this.handleCancel}>取消</Button>]}>
          <Tabs type="card" onChange={this.callback}>
            <TabPane tab="中医四诊" key="1"><DiagnosisOfZh ref='zhD'/></TabPane>
            <TabPane tab="西医检查" key="2"><DiagnosisOfWe ref='weD'/></TabPane>
            <TabPane tab="诊断治疗" key="3"><DagnosisAndtreatment ref='arD'/></TabPane>
            <TabPane tab="其他信息" key="4"><OhterInfo ref='orD'/></TabPane>
          </Tabs>
        </Modal>
      </div>
    )
  }
}

export default connect(({ loading, Idetail }) => ({ loading, Idetail }))(modalAdd)
