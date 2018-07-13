import { connect } from 'dva';
import { Table, Button, Row, Col, Input, Divider, Select, Modal } from 'antd';
import PropTypes from 'prop-types';
import Info from '../../InformationCollection/$id/compontent/info';
import We from '../../InformationCollection/$id/compontent/diagnosisOfWe';
import Zh from '../../InformationCollection/$id/compontent/diagnosisOfZh';
import Or from '../../InformationCollection/$id/compontent/ohter';
import styles from '../index.css';
const Option = Select.Option;

const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号'
  }, {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号'
  }];
const columns = [
  {
    title: '病人姓名',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '就诊次数',
    dataIndex: 'jzcs',
    key: 'jzcs',
  }, {
    title: '中医疾病',
    dataIndex: 'zyjb',
    key: 'zyjb',
  }, {
    title: '西医疾病',
    dataIndex: 'xyjb',
    key: 'xyjb',
  },{
    title: '中医证候',
    dataIndex: 'zyzh',
    key: 'zyzh',
  },{
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <span className={styles.details} onClick={()=>details(text)}>详情</span>
      </span>
    ),
  }
];
let dis = '';
const details = (data) => {
  dis({type:'knowledge/changeVisibleC', payload: {visible: true}})
}

const ya = ({loading, knowledge, dispatch}) => {
  dis = dispatch;
  const handleOk = (e) => {
    dispatch({type:'knowledge/changeVisibleC', payload: {visible: false}})
  }

  const handleCancel = (e) => {
    dispatch({type:'knowledge/changeVisibleC', payload: {visible: false}})
  }

  return (
    <div>
      <Row>
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>病人姓名：<Input style={{width:'200px'}}/></Col>
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>处方名称：<Input style={{width:'200px'}}/></Col>
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>中医疾病：<Input style={{width:'200px'}}/></Col>
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>西医疾病：<Input style={{width:'200px'}}/></Col>
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>中医证候：<Input style={{width:'200px'}}/></Col>
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>中医症状：<Input style={{width:'200px'}}/></Col>
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>处方医师：<Input style={{width:'200px'}}/></Col>
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>所属科室：
          <Select
            showSearch
            style={{ width: 200 }}
            optionFilterProp="children"
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="tom">Tom</Option>
          </Select>
        </Col>
      </Row>
      <Button style={{marginLeft: '2px', float: 'right', marginRight: '120px'}}>重置</Button>
      <Button style={{marginLeft: '2px', float: 'right'}} type='primary'>查询</Button>
      <br/>
      <Divider/>
      <Table dataSource={dataSource} columns={columns} />

      <Modal title="详情" visible={knowledge.visibleC} onOk={handleOk} onCancel={handleCancel}>
        <Info/>
        <We/>
        <Zh/>
        <Or/>
      </Modal>
    </div>
  )
}
ya.propTypes = {
  Idetail: PropTypes.object,
  loading: PropTypes.object,
}
export default connect(({ loading, knowledge }) => ({ loading, knowledge }))(ya)
