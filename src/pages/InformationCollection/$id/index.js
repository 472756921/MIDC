import React from 'react';
import { connect } from 'dva';
import { Tabs, Table, Divider, Row, Col, Modal, Button } from 'antd';
import PropTypes from 'prop-types';
import Info from './compontent/info';
import DiagnosisOfZh from './compontent/diagnosisOfZh';
import DiagnosisOfWe from './compontent/diagnosisOfWe';
import OhterInfo from './compontent/ohter';
import DagnosisAndtreatment from './compontent/diagnosisAndtreatment';
import AddModal from './compontent/add/add';
import Confirm from '../../../components/Confirm';

const TabPane = Tabs.TabPane;
let _dispatch = '';
const columns = [
{
  title: '就诊时间',
  dataIndex: 'date',
  key: 'date',
},
{
  title: '就诊次数',
  dataIndex: 'visitTimes',
  key: 'visitTimes',
},
{
  title: '操作',
  key: 'action',
  render: (text, record, index) => {
    return (
    <span>
      <span style={{cursor: 'pointer',color: '#3085bf'}} onClick={()=>{datileInVisit(index)}}>详情 </span>
      <span> | </span>
      <span style={{cursor: 'pointer',color: '#3085bf'}} onClick={()=>{saveYaf(text.id)}}> 保存为医案</span>
    </span>
    )
  },
}];
function datileInVisit(index) {
  _dispatch({type: 'Idetail/changIndex', payload:{index: index}});
}
function saveYaf(dId) {
  _dispatch({type: 'Idetail/setTempData', payload:{temp: dId}});
  Confirm('确认保存为医案','确认将该就诊记录保存为医案？', saveYaO);
}
const saveYaO = () => {
  _dispatch({type: 'Idetail/saveYan'});
}



const ICD = ({loading, Idetail, dispatch}) => {
  _dispatch = dispatch;
  const handleCancel = () => {dispatch({type: 'Idetail/showImg', payload:{ visible: false, imgSrc: '' }});};
  function imgShow(srcs) {
    dispatch({type: 'Idetail/showImg', payload:{ visible: true, imgSrc: srcs }});
  }
  const addModel = ()=>{
    dispatch({type: 'Idetail/addModelOp', payload:{f: true}});
  }
  return(
    <div>
      <Button type="primary" icon="file-add" onClick={addModel}>添加就诊记录</Button>
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
            Idetail.patient.historyData.data!==undefined&&Idetail.patient.historyData.data.length!==0?
              <Tabs type="card">
                <TabPane tab="中医四诊" key="1"><DiagnosisOfZh info={Idetail.patient.historyData.data[Idetail.index].diagnosisOfZh} imgShow={imgShow}/></TabPane>
                <TabPane tab="西医检查" key="2"><DiagnosisOfWe info={Idetail.patient.historyData.data[Idetail.index].diagnosisOfWe} imgShow={imgShow}/></TabPane>
                <TabPane tab="诊断治疗" key="3"><DagnosisAndtreatment info={Idetail.patient.historyData.data[Idetail.index].diagnosisAndtreatment}/></TabPane>
                <TabPane tab="其他信息" key="4"><OhterInfo info={Idetail.patient.historyData.data[Idetail.index].orther}/></TabPane>
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

      <Modal title="图片详情" width='800px'  closable={false} visible={Idetail.visible}
             footer={[<Button key="back" onClick={handleCancel}>关闭</Button>]}>
        <img src={Idetail.imgSrc} width='100%' alt='检查报告图片'/>
      </Modal>

      <AddModal/>

    </div>
  )
}

ICD.propTypes = {
  Idetail: PropTypes.object,
  loading: PropTypes.object,
}

export default connect(({ loading, Idetail }) => ({ loading, Idetail }))(ICD)
