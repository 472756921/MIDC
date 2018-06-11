import React from 'react';
import { Tabs, Row, Col, Modal, Button } from 'antd';
import DiagnosisOfZh from './diagnosisOfZh';
import DiagnosisOfWe from './diagnosisOfWe';
import OhterInfo from './ohter';
import DagnosisAndtreatment from './diagnosisAndtreatment';

const TabPane = Tabs.TabPane;


class modalAdd extends React.Component{
  constructor(props){
    super(props);
    this.state={
      modalShow: true,
    }
  }

  handleCancel(){
    console.log(123);
  }

  render(){
    return (
      <div>
        <Modal title="添加就诊记录" width='800px'  closable={false} visible={this.state.modalShow}
               footer={[<Button key="back" onClick={this.handleCancel}>关闭</Button>]}>
          <Tabs type="card">
            <TabPane tab="中医四诊" key="1"><DiagnosisOfZh/></TabPane>
          </Tabs>
        </Modal>
      </div>
    )
  }
}

export default modalAdd;
