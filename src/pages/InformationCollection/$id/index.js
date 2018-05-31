import React from 'react';
import { connect } from 'dva';
import { Tabs, Table, Icon, Divider, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import Info from './compontent/info';
import DiagnosisOfZh from './compontent/diagnosisOfZh';

const TabPane = Tabs.TabPane;
const columns = [{
  title: '就诊时间',
  dataIndex: 'date',
  key: 'date',
}, {
  title: '就诊次数',
  dataIndex: 'visitTimes',
  key: 'visitTimes',
}, {
  title: '操作',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="javascript:;">详情</a>
    </span>
  ),
}];

const ICD = ({loading, Idetail, dispatch}) => {
  const chage = (p, f, s) => {
    dispatch({type: 'informationCollection/query', payload:{ page: p.current, pageSize: 30 }});
  }
  function callback(key) {
    console.log(key);
  }


  return(
    <div>
      <Divider orientation="left">基础信息</Divider>
      <Info info={Idetail.patient.info}/>

      <Row gutter={16}>
        <Col xxl={{span:8}}>
          <Divider orientation="left">就诊历史</Divider>
          <Table columns={columns} dataSource={Idetail.patient.historyData.data} pagination={{size: 'small'}}/>
        </Col>
        <Col xxl={{span:16}}>
          <Divider orientation="left">就诊详情</Divider>
          {
            Idetail.patient.historyData.data?
              <Tabs onChange={callback} type="card">
                <TabPane tab="中医四诊" key="1"><DiagnosisOfZh info={Idetail.patient.historyData.data[0].diagnosisOfZh}/></TabPane>
                <TabPane tab="西医检查" key="2">Content of Tab Pane 3</TabPane>
                <TabPane tab="诊断治疗" key="3">Content of Tab Pane 3</TabPane>
                <TabPane tab="其他信息" key="4">Content of Tab Pane 3</TabPane>
                <TabPane tab="综合信息" key="5">Content of Tab Pane 3</TabPane>
              </Tabs>
            :''
          }
        </Col>
      </Row>


    </div>
  )
}

ICD.propTypes = {
  Idetail: PropTypes.object,
  loading: PropTypes.object,
}

export default connect(({ loading, Idetail }) => ({ loading, Idetail }))(ICD)
