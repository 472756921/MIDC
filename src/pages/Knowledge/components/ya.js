import { connect } from 'dva';
import { Table, Button, Row, Col, Input, Divider, Select, Modal } from 'antd';
import PropTypes from 'prop-types';
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
    dataIndex: 'zzjb',
    key: 'zzjb',
  }, {
    title: '中医疾病',
    dataIndex: 'syzh',
    key: 'syzh',
  }, {
    title: '西医疾病',
    dataIndex: 'fjzc',
    key: 'fjzc',
  },{
    title: '中医证候',
    dataIndex: 'fjzc',
    key: 'fjzc',
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

const mic = ({loading, knowledge, dispatch}) => {
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
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>方剂名称：<Input style={{width:'200px'}}/></Col>
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>处方来源：<Input style={{width:'200px'}}/></Col>
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>处方医师：<Input style={{width:'200px'}}/></Col>
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>指定中药：<Input style={{width:'200px'}}/></Col>
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>中医疾病：<Input style={{width:'200px'}}/></Col>
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>西医疾病：<Input style={{width:'200px'}}/></Col>
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>中医证候：<Input style={{width:'200px'}}/></Col>
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>方剂主治：<Input style={{width:'200px'}}/></Col>
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>中医症状：<Input style={{width:'200px'}}/></Col>
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>方剂类别：
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
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>给药途径：
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
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>来源医案：
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
        <div>处方名称：</div>
        <div>处方类型：</div>
        <div>剂型：</div>
        <div>给药途径：</div>
        <div>朝代：</div>
        <div>处方医师：</div>
        <div>处方来源：</div>
        <div className={styles.detail}>XXXXX</div>
        <div>煎服方法：</div>
        <div className={styles.detail}>XXXXX</div>
        <div>方剂主治：</div>
        <div className={styles.detail}>XXXXX</div>
        <div>方剂功效：</div>
        <div className={styles.detail}>XXXXX</div>
        <div>适宜证候：</div>
        <div className={styles.detail}>XXXXX</div>
        <div>方剂组成：</div>
        <div className={styles.detail}>XXXXX</div>
        <div>中医疾病：</div>
        <div className={styles.detail}>XXXXX</div>
        <div>西医疾病：</div>
        <div className={styles.detail}>XXXXX</div>
        <div>备注：</div>
        <div className={styles.detail}>XXXXX</div>
      </Modal>
    </div>
  )
}

export default connect(({ loading, knowledge }) => ({ loading, knowledge }))(mic)
