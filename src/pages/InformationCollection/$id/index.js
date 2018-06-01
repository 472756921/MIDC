import React from 'react';
import { connect } from 'dva';
import { Tabs, Table, Icon, Divider, Row, Col, Modal, Button } from 'antd';
import PropTypes from 'prop-types';
import Info from './compontent/info';
import DiagnosisOfZh from './compontent/diagnosisOfZh';
import DiagnosisOfWe from './compontent/diagnosisOfWe';
import OhterInfo from './compontent/ohter';
import DagnosisAndtreatment from './compontent/diagnosisAndtreatment';

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
  function callback(key) {
    console.log(key);
  }
  const handleCancel = () => {dispatch({type: 'Idetail/showImg', payload:{ visible: false, imgSrc: '' }});};
  function imgShow(srcs) {
    let s = srcs.split('/');
    s[s.length-1] = '600x900';
    srcs = s.join('/');
    console.log(srcs);
    dispatch({type: 'Idetail/showImg', payload:{ visible: true, imgSrc: srcs }});
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
                <TabPane tab="中医四诊" key="1"><DiagnosisOfZh info={Idetail.patient.historyData.data[0].diagnosisOfZh} imgShow={imgShow}/></TabPane>
                <TabPane tab="西医检查" key="2"><DiagnosisOfWe info={Idetail.patient.historyData.data[0].diagnosisOfWe} imgShow={imgShow}/></TabPane>
                <TabPane tab="诊断治疗" key="3"><DagnosisAndtreatment info={Idetail.patient.historyData.data[0].diagnosisAndtreatment}/></TabPane>
                <TabPane tab="其他信息" key="4"><OhterInfo info={Idetail.patient.historyData.data[0].orther}/></TabPane>
                {/*<TabPane tab="综合信息" key="5">*/}
                  {/*<DiagnosisOfZh info={Idetail.patient.historyData.data[0].diagnosisOfZh}/>*/}
                  {/*<DiagnosisOfWe info={Idetail.patient.historyData.data[0].diagnosisOfWe}/>*/}
                  {/*<DagnosisAndtreatment info={Idetail.patient.historyData.data[0].diagnosisAndtreatment}/>*/}
                  {/*<OhterInfo info={Idetail.patient.historyData.data[0].orther}/>*/}
                {/*</TabPane>*/}
              </Tabs>
            :''
          }
        </Col>
      </Row>

      <Modal title="图片详情" width='800px'  closable={false} visible={Idetail.visible} footer={[<Button key="back" onClick={handleCancel}>关闭</Button>]}>
        <img src={Idetail.imgSrc} width='100%'/>
      </Modal>

    </div>
  )
}

ICD.propTypes = {
  Idetail: PropTypes.object,
  loading: PropTypes.object,
}

export default connect(({ loading, Idetail }) => ({ loading, Idetail }))(ICD)
