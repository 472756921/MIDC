import React from 'react';
import { connect } from 'dva';
import { Tabs, Modal, Button } from 'antd';
import DiagnosisOfZh from './diagnosisOfZh';
import DiagnosisOfWe from './diagnosisOfWe';
import DagnosisAndtreatment from './diagnosisAndtreatment';
import OhterInfo from './ohter';

const TabPane = Tabs.TabPane;
let _this = '', dis = '';
class modalAdd extends React.Component{
  constructor(props){
    super(props);
    _this = this;
    dis = props.dispatch;
  }
  componentWillReceiveProps(np) {
    if(np.systemMannger.temp) {
      _this.handleAdd();
    }
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
    dis({type: 'systemMannger/tempData', postData});
  }

  render(){
    return (
      <Tabs type="card">
        <TabPane forceRender={true} tab="中医四诊" key="1"><DiagnosisOfZh ref='zhD' data={this.props.systemMannger.itemData.diagnosisOfZh}/></TabPane>
        <TabPane forceRender={true} tab="西医检查" key="2"><DiagnosisOfWe ref='weD' data={this.props.systemMannger.itemData.diagnosisOfWe}/></TabPane>
        <TabPane forceRender={true} tab="诊断治疗" key="3"><DagnosisAndtreatment ref='arD' data={this.props.systemMannger.itemData.diagnosisAndtreatment}/></TabPane>
        <TabPane forceRender={true} tab="其他信息" key="4"><OhterInfo ref='orD' data={this.props.systemMannger.itemData.orther}/></TabPane>
      </Tabs>
    )
  }
}

export default connect(({ loading, systemMannger }) => ({ loading, systemMannger }))(modalAdd)
