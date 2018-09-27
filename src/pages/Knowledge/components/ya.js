import {connect} from 'dva';
import {Table, Button, Row, Col, Input, Divider, Select, Modal} from 'antd';
import PropTypes from 'prop-types';
import Info from '../../InformationCollection/$id/compontent/info';
import We from '../../InformationCollection/$id/compontent/diagnosisOfWe';
import Zh from '../../InformationCollection/$id/compontent/diagnosisOfZh';
import Zz from '../../InformationCollection/$id/compontent/diagnosisAndtreatment';
import Or from '../../InformationCollection/$id/compontent/ohter';
import styles from '../index.css';

const Option = Select.Option;
let dis = '';
const columns = [
  {
    title: '病人姓名',
    dataIndex: 'patient.name',
    key: 'name',
  }, {
    title: '就诊次数',
    dataIndex: 'visitTimes',
    key: 'visitTimes',
  }, {
    title: '中医疾病',
    dataIndex: 'diagnosisAndtreatment.zyjb',
    key: 'zyjb',
  }, {
    title: '西医疾病',
    dataIndex: 'diagnosisAndtreatment.xyjb',
    key: 'xyjb',
  }, {
    title: '中医证候',
    dataIndex: 'diagnosisAndtreatment.zyzh',
    key: 'zyzh',
  }, {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <span className={styles.details} onClick={() => details(text)}>详情</span>
      </span>
    ),
  }
];
const details = (data) => {
  dis({type: 'knowledge/showYa', payload: {visible: true, data: data}})
}

const ya = ({loading, knowledge, dispatch}) => {
  dis = dispatch;
  const handleOk = (e) => {
    dispatch({type: 'knowledge/changeVisibleC', payload: {visible: false}})
  }

  const handleCancel = (e) => {
    dispatch({type: 'knowledge/changeVisibleC', payload: {visible: false}})
  }
  const reset = (e) => {
    dispatch({
      type: 'knowledge/reset',
      payload: {searchV: {doctor: "", name: "", xyjb: "", zfm: "", zhenzhuang: "", zyjb: "", zyzh: ""}, tableList: []}
    });
  }
  const changeSeV = (data) => {
    let searchV = knowledge.searchV2;
    searchV[data.target.title] = data.target.value;
    dispatch({type: 'knowledge/setSearchV', payload: {searchV: searchV}});
  }
  const searchData = () => {
    dispatch({type: 'knowledge/searchData', payload: {type: 'ya'}});
  }
  return (
    <div>
      <Row>
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>
          病人姓名：
          <Input value={knowledge.searchV.name} onChange={changeSeV} title='name' style={{width: '200px'}}/>
        </Col>
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>
          处方名称：
          <Input value={knowledge.searchV.zfm} onChange={changeSeV} title='zfm'  style={{width: '200px'}}/>
        </Col>
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>
          中医疾病：
          <Input value={knowledge.searchV.zyjb} onChange={changeSeV} title='zyjb'  style={{width: '200px'}}/>
        </Col>
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>
          西医疾病：
          <Input value={knowledge.searchV.xyjb} onChange={changeSeV} title='xyjb' style={{width: '200px'}}/>
        </Col>
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>
          中医证候：
          <Input value={knowledge.searchV.zyzh} onChange={changeSeV} title='zyzh' style={{width: '200px'}}/>
        </Col>
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>
          中医症状：
          <Input value={knowledge.searchV.zhenzhuang} onChange={changeSeV} title='zhenzhuang' style={{width: '200px'}}/>
        </Col>
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>
          处方医师：
          <Input value={knowledge.searchV.doctor} onChange={changeSeV} title='doctor' style={{width: '200px'}}/>
        </Col>
        {/*<Col xl={8} xxl={4} style={{marginBottom: '5px'}}>所属科室：*/}
          {/*<Select*/}
            {/*showSearch*/}
            {/*style={{width: 200}}*/}
            {/*optionFilterProp="children"*/}
            {/*filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}*/}
          {/*>*/}
            {/*<Option value="jack">Jack</Option>*/}
            {/*<Option value="lucy">Lucy</Option>*/}
            {/*<Option value="tom">Tom</Option>*/}
          {/*</Select>*/}
        {/*</Col>*/}
      </Row>
      <Button style={{marginLeft: '2px', float: 'right', marginRight: '120px'}} onClick={reset}>重置</Button>
      <Button style={{marginLeft: '2px', float: 'right'}} type='primary' onClick={searchData}>查询</Button>
      <br/>
      <Divider/>
      <Table dataSource={knowledge.tableList} columns={columns}/>

      <Modal title="详情" visible={knowledge.visibleC} onOk={handleOk} onCancel={handleCancel} width={700}>
        {/*<Info/>*/}
        <We info={knowledge.yaShowData.diagnosisOfWe}/>
        <Zh info={knowledge.yaShowData.diagnosisOfZh}/>
        <Zz info={knowledge.yaShowData.diagnosisAndtreatment}/>
        <Or info={knowledge.yaShowData.orther}/>
      </Modal>
    </div>
  )
}
ya.propTypes = {
  Idetail: PropTypes.object,
  loading: PropTypes.object,
}
export default connect(({loading, knowledge}) => ({loading, knowledge}))(ya)
